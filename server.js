const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper");
const archiver = require("archiver");
const ffmpeg = require("fluent-ffmpeg");
const sharp = require("sharp");  // For image optimization
const jsonminify = require("json-minify");  // For minifying JSON

const app = express();
const PORT = 3000;

// Setup static folder for public assets
app.use(express.static("public"));

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

// Helper: Convert WAV to MP3
async function convertWavToMp3(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .toFormat("mp3")
            .on("end", () => resolve())
            .on("error", (err) => reject(err))
            .save(outputPath);
    });
}

// Helper: Optimize Images (Web Optimization) - Keep PNG format
async function optimizeImage(inputPath) {
    try {
        const tempPath = `${inputPath}.tmp`;  // Temporary file path for optimized image
        
        // Use sharp to optimize the PNG image for web (no format change)
        await sharp(inputPath)
            .png({ quality: 75, compressionLevel: 9 })  // Optimize PNG
            .toFile(tempPath);  // Write to temporary file
        
        // Replace original image with the optimized version
        await fs.promises.rename(tempPath, inputPath);  // Rename temp file to original file path
        
        console.log(`Optimized image: ${inputPath}`);
    } catch (err) {
        console.error(`Failed to optimize image: ${inputPath}`, err);
    }
}

// Endpoint: File Upload and Optimization
app.post("/upload", upload.single("file"), async (req, res) => {
    const uploadPath = req.file.path;
    const outputDir = `uploads/${path.parse(req.file.originalname).name}`;
    const outputSb3 = `uploads/optimized_${path.parse(req.file.originalname).name}.sb3`; // Set the final .sb3 extension

    try {
        // Step 1: Unzip uploaded SB3
        await fs.promises.mkdir(outputDir, { recursive: true });
        await fs.createReadStream(uploadPath)
            .pipe(unzipper.Extract({ path: outputDir }))
            .promise();

        // Step 2: Process project.json
		const projectPath = path.join(outputDir, "project.json");
		let projectData = await fs.promises.readFile(projectPath, "utf8");

		// Minify the project JSON file content
		projectData = jsonminify(projectData);  // Use jsonminify here to minify the content

        // Minify the project.json
        const minifiedData = jsonminify(JSON.stringify(projectData));
        
        // Step 3: Convert sounds from WAV to MP3
        for (const target of projectData.targets) {
            if (target.sounds) {
                for (const sound of target.sounds) {
                    if (sound.dataFormat === "wav") {
                        const wavPath = path.join(outputDir, sound.md5ext);
                        const mp3Path = wavPath.replace(".wav", ".mp3");

                        // Convert to MP3 and update metadata
                        console.log(`Converting WAV to MP3: ${wavPath} -> ${mp3Path}`);
                        await convertWavToMp3(wavPath, mp3Path);
                        sound.md5ext = sound.md5ext.replace(".wav", ".mp3");
                        sound.dataFormat = "mp3";
                    }
                }
            }

            // Step 4: Optimize images (e.g., .png, .jpeg) and overwrite original
            if (target.costumes) {
                for (const costume of target.costumes) {
                    if (costume.dataFormat === "png" || costume.dataFormat === "jpeg") {
                        const imagePath = path.join(outputDir, costume.md5ext);

                        // Optimize and overwrite image
                        await optimizeImage(imagePath); // Overwrite the original image with optimized version
                        costume.md5ext = costume.md5ext; // No change in the filename as we overwrite
                    }
                }
            }
        }

        // Update and save the minified project.json
        await fs.promises.writeFile(projectPath, minifiedData);

        // Step 5: Cleanup unused files
        const cleanupFiles = [];  // You can add cleanup logic if necessary

        // Step 6: Calculate file sizes
        const originalSize = (req.file.size / (1024 * 1024)).toFixed(2); // Original file size in MB
        const optimizedSize = fs.statSync(outputSb3).size / (1024 * 1024); // Optimized file size in MB

        // Step 7: Re-zip optimized files into .sb3
        const output = fs.createWriteStream(outputSb3);
        const archive = archiver("zip", { zlib: { level: 9 } });
        archive.pipe(output);
        archive.directory(outputDir, false);

        // Finalize the archive and close the stream
        console.log(`Creating .sb3 file at: ${outputSb3}`);
        await archive.finalize();

        // Step 8: Cleanup extracted folder and original uploaded file
        fs.rmSync(outputDir, { recursive: true, force: true });
        fs.unlinkSync(uploadPath);

        // Verify if the .sb3 file was created
        if (!fs.existsSync(outputSb3)) {
            console.error(`File was not created: ${outputSb3}`);
            return res.status(500).send("Error: Optimized .sb3 file not found.");
        }

        // Respond with file info
        res.json({
            message: "Optimization complete!",
            originalSize: `${originalSize} MB`,
            optimizedSize: `${optimizedSize.toFixed(2)} MB`,
            downloadUrl: `/uploads/optimized_${path.parse(req.file.originalname).name}.sb3`, // Updated download URL with .sb3 extension
        });
    } catch (err) {
        console.error("Error processing file:", err);
        res.status(500).send("An error occurred during processing.");
    }
});

// Serve optimized files
app.get("/uploads/:filename", (req, res) => {
    const filePath = path.join(__dirname, "uploads", req.params.filename);
    console.log(`Serving file: ${filePath}`);
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).send("File not found.");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
