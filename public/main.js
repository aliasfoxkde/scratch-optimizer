// Initialize required variables
const dropzone = document.getElementById("dropzone");
const summaryDiv = document.getElementById("summary");
let lamejs; // Will be loaded dynamically

// Load required libraries
async function loadDependencies() {
    // Load lamejs for MP3 encoding
    await import('https://cdn.jsdelivr.net/npm/lamejs@1.2.1/lame.min.js');
    lamejs = window.lamejs;
}

loadDependencies();

// Drag-and-Drop Handling
dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("dragging");
});

dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("dragging");
});

dropzone.addEventListener("drop", async (e) => {
    e.preventDefault();
    dropzone.classList.remove("dragging");

    const file = e.dataTransfer.files[0];
    if (file) {
        await processFile(file);
    }
});

// File Input Click Handling
dropzone.addEventListener("click", async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".sb2,.sb3,.sprite3,.sprite2";
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            await processFile(file);
        }
    };
    input.click();
});

// Theme Toggle
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");

    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }

    // Toggle theme on button click
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    });
});

// Convert WAV ArrayBuffer to MP3 ArrayBuffer using lamejs
async function convertWavToMp3(wavArrayBuffer) {
    // Parse WAV header
    const wavView = new DataView(wavArrayBuffer);
    const numChannels = wavView.getUint16(22, true);
    const sampleRate = wavView.getUint32(24, true);
    const bitsPerSample = wavView.getUint16(34, true);

    // Get audio data
    const wavData = new Int16Array(wavArrayBuffer, 44); // Skip WAV header

    // Initialize MP3 encoder
    const mp3encoder = new lamejs.Mp3Encoder(numChannels, sampleRate, 128);
    const mp3Data = [];

    // Convert to MP3
    const sampleBlockSize = 1152; // Multiple of 576
    for (let i = 0; i < wavData.length; i += sampleBlockSize) {
        const samples = wavData.slice(i, i + sampleBlockSize);
        let mp3buf;
        
        if (numChannels === 1) {
            mp3buf = mp3encoder.encodeBuffer(samples);
        } else {
            // Split stereo channels
            const leftChannel = new Int16Array(samples.length / 2);
            const rightChannel = new Int16Array(samples.length / 2);
            for (let j = 0; j < samples.length; j += 2) {
                leftChannel[j/2] = samples[j];
                rightChannel[j/2] = samples[j+1];
            }
            mp3buf = mp3encoder.encodeBuffer(leftChannel, rightChannel);
        }
        
        if (mp3buf.length > 0) {
            mp3Data.push(mp3buf);
        }
    }

    // Get the last chunk of MP3 data
    const lastMp3buf = mp3encoder.flush();
    if (lastMp3buf.length > 0) {
        mp3Data.push(lastMp3buf);
    }

    // Combine all MP3 chunks
    const totalLength = mp3Data.reduce((acc, buf) => acc + buf.length, 0);
    const mp3ArrayBuffer = new Uint8Array(totalLength);
    let offset = 0;
    for (const buf of mp3Data) {
        mp3ArrayBuffer.set(buf, offset);
        offset += buf.length;
    }

    return mp3ArrayBuffer.buffer;
}

// Optimize PNG using Canvas
async function optimizePng(arrayBuffer) {
    return new Promise((resolve) => {
        const blob = new Blob([arrayBuffer]);
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((optimizedBlob) => {
                optimizedBlob.arrayBuffer().then(resolve);
            }, 'image/png', 0.75);
        };

        img.src = URL.createObjectURL(blob);
    });
}

async function processFile(file) {
    summaryDiv.innerHTML = "<p>Processing...</p>";
    const originalSize = file.size;

    try {
        // Read the .sb3 file
        const zip = new JSZip();
        const contents = await zip.loadAsync(file);
        
        // Process project.json
        let projectJson;
        if (contents.files['project.json']) {
            projectJson = JSON.parse(await contents.files['project.json'].async('text'));
        } else if (contents.files['sprite.json']) {
            projectJson = JSON.parse(await contents.files['sprite.json'].async('text'));
        } else {
            throw new Error('No project.json or sprite.json found');
        }

        // Create new zip for optimized content
        const optimizedZip = new JSZip();
        
        // Process each file
        for (const [filename, zipEntry] of Object.entries(contents.files)) {
            if (zipEntry.dir) {
                optimizedZip.folder(filename);
                continue;
            }

            const content = await zipEntry.async('arraybuffer');

            if (filename.endsWith('.wav')) {
                // Convert WAV to MP3
                const mp3Data = await convertWavToMp3(content);
                const newFilename = filename.replace('.wav', '.mp3');
                optimizedZip.file(newFilename, mp3Data);
                
                // Update project.json references
                projectJson = JSON.stringify(projectJson)
                    .replace(new RegExp(filename, 'g'), newFilename)
                    .replace(/"dataFormat":"wav"/g, '"dataFormat":"mp3"');
                projectJson = JSON.parse(projectJson);
            } else if (filename.endsWith('.png')) {
                // Optimize PNG
                const optimizedPng = await optimizePng(content);
                optimizedZip.file(filename, optimizedPng);
            } else if (filename === 'project.json' || filename === 'sprite.json') {
                // Add updated project.json
                optimizedZip.file(filename, JSON.stringify(projectJson));
            } else {
                // Copy other files as-is
                optimizedZip.file(filename, content);
            }
        }

        // Generate optimized .sb3 file
        const optimizedContent = await optimizedZip.generateAsync({
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: { level: 9 }
        });

        // Create download URL
        const downloadUrl = URL.createObjectURL(optimizedContent);
        const optimizedSize = optimizedContent.size;

        // Show results
        const originalSizeMB = (originalSize / 1024 / 1024).toFixed(2);
        const optimizedSizeMB = (optimizedSize / 1024 / 1024).toFixed(2);
        const savings = (((originalSize - optimizedSize) / originalSize) * 100).toFixed(1);

        summaryDiv.innerHTML = `
            <h2>File optimized successfully!</h2>
            <p><strong>Original File Size:</strong> ${originalSizeMB} MB</p>
            <p><strong>Optimized File Size:</strong> ${optimizedSizeMB} MB</p>
            <p><strong>Space Saved:</strong> ${savings}%</p>
        `;

        // Create download button
        const fileName = file.name.replace(/\.[^/.]+$/, '') + '_optimized.sb3';
        createDownloadButton(downloadUrl, fileName);

    } catch (err) {
        console.error(err);
        summaryDiv.innerHTML = `<p style="color: red;">Error: ${err.message}</p>`;
    }
}

// Create Download Button
function createDownloadButton(fileUrl, fileName) {
    const existingButton = document.getElementById("downloadButton");
    if (existingButton) existingButton.remove();

    const button = document.createElement("a");
    button.id = "downloadButton";
    button.href = fileUrl;
    button.download = fileName;
    button.textContent = `Download ${fileName}`;
    button.style = `
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 16px;
        font-weight: bold;
        color: #ffffff;
        background-color: #007bff;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
        transition: background-color 0.3s;
    `;

    button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "#0056b3";
    });

    button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "#007bff";
    });

    summaryDiv.appendChild(button);
}
