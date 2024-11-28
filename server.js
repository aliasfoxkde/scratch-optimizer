const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');
const express = require('express');
const multer = require('multer');
const archiver = require('archiver');
const ffmpeg = require('fluent-ffmpeg');
const sharp = require('sharp');

const app = express();
const PORT = 3000;

// Setup static folder for public assets
app.use(express.static('public'));

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Helper: Convert WAV to MP3
async function convertWavToMp3(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .toFormat('mp3')
            .on('end', () => resolve())
            .on('error', (err) => reject(err))
            .save(outputPath);
    });
}

// Helper: Optimize Images (PNG and SVG)
async function optimizeImage(inputPath) {
    try {
        const tempPath = `${inputPath}.tmp`;
        await sharp(inputPath)
            // .png({ quality: 75, compressionLevel: 9 })
            .png({ quality: 75, compressionLevel: 9 })
            .toFile(tempPath);
        await fs.promises.rename(tempPath, inputPath);
        console.log(`Optimized image: ${inputPath}`);
    } catch (err) {
        console.error(`Failed to optimize image: ${inputPath}`, err);
    }
}

// Endpoint: File Upload and Optimization
app.post('/upload', upload.single('file'), async (req, res) => {
    const uploadPath = req.file.path;
    const outputDir = `uploads/${path.parse(req.file.originalname).name}`;
    const outputSb3 = `uploads/optimized_${path.parse(req.file.originalname).name}.sb3`;

    try {
        // Truncate comments >= 8000 characters (SB2 compatability fix)
		
		// Step 1: Unzip uploaded SB3 file
        await fs.promises.mkdir(outputDir, { recursive: true });

        // Extract SB3 file to outputDir
        const unzipStream = fs.createReadStream(uploadPath).pipe(unzipper.Extract({ path: outputDir }));
        await new Promise((resolve, reject) => {
            unzipStream.on('close', resolve);
            unzipStream.on('error', reject);
        });

        // Step 2: Convert sounds from WAV to MP3 in the directory
        const files = await fs.promises.readdir(outputDir);

        for (const file of files) {
            const filePath = path.join(outputDir, file);

            // Convert WAV to MP3
            if (file.endsWith('.wav')) {
                const mp3Path = filePath.replace('.wav', '.mp3');
                await convertWavToMp3(filePath, mp3Path);
                await fs.promises.unlink(filePath); // Remove original WAV file
            }

            // Optimize images
            if (file.endsWith('.png') || file.endsWith('.svg')) {
                await optimizeImage(filePath);
            }
        }

        // Step 3: Process project.json
        const projectPath = path.join(outputDir, 'project.json');
        const stat = await fs.promises.stat(projectPath);

        if (stat.isFile()) {
            let projectData = await fs.promises.readFile(projectPath, 'utf8');
            try {
                // Perform find/replace directly on the string content
                projectData = projectData.replace(/\.wav"/g, '.mp3"').replace(/"dataFormat":"wav"/g, '"dataFormat":"mp3"');

                // Save the modified project.json without reformatting it
                await fs.promises.writeFile(projectPath, projectData);
            } catch (err) {
                console.error('Error processing project.json:', err);
                return res.status(500).send('Error processing project.json.');
            }
        } else {
            return res.status(500).send('project.json not found or invalid.');
        }
        // Step 4: Repackage optimized files into .sb3
        const output = fs.createWriteStream(outputSb3);
        const archive = archiver('zip', { zlib: { level: 7 } }); // Adjusted compression level

        archive.pipe(output);
        archive.directory(outputDir, false);
        await archive.finalize();

        // Download the file after archiving
        res.download(outputSb3, 'optimized.sb3', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error sending file.');
            } else {
                console.log('File download completed successfully');
            }
        });
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).send('Error processing file.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
