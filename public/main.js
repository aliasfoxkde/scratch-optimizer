 // Initialize required variables
const dropzone = document.getElementById("dropzone");
const summaryDiv = document.getElementById("summary");

// UI Elements
const progressContainer = document.getElementById('progress-container');
const progressText = progressContainer?.querySelector('.progress-text');
const progressPercentage = progressContainer?.querySelector('.percentage');
const progressStatus = progressContainer?.querySelector('.status');
const progressFill = progressContainer?.querySelector('.progress-fill');
const logContainer = document.getElementById('log-container');
const logContent = document.getElementById('log-content');

// Initialize logger
const logger = {
    info: async (message) => console.info(message),
    error: async (message, data) => console.error(message, data),
    logUIEvent: async (event, data) => console.log(`UI Event: ${event}`, data)
};

// Load required libraries
async function loadDependencies() {
    try {
        // Check if lamejs is available
        if (typeof window.lamejs === 'undefined') {
            throw new Error('lamejs library not found');
        }
        await logger.info('Dependencies loaded successfully');
    } catch (error) {
        await logger.error('Failed to load dependencies', error);
        throw error;
    }
}

// Initialize application
(async () => {
    try {
        await loadDependencies();
        await logger.info('Application initialized successfully');
    } catch (error) {
        await logger.error('Failed to initialize application', error);
    }
})();

// Drag-and-Drop Handling
const ALLOWED_EXTENSIONS = ['.sb2', '.sb3', '.sprite2', '.sprite3'];

function isValidFileType(filename) {
    return ALLOWED_EXTENSIONS.some(ext => filename.toLowerCase().endsWith(ext));
}

function showError(message) {
    summaryDiv.innerHTML = `<p style="color: red;">Error: ${message}</p>`;
}

dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("dragging");
    logger.logUIEvent('dragover');
});

dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("dragging");
    logger.logUIEvent('dragleave');
});

dropzone.addEventListener("drop", async (e) => {
    e.preventDefault();
    dropzone.classList.remove("dragging");
    logger.logUIEvent('drop');

    const file = e.dataTransfer.files[0];
    if (file) {
        if (!isValidFileType(file.name)) {
            showError(`Unsupported file type. Please use ${ALLOWED_EXTENSIONS.join(', ')} files only.`);
            logger.logUIEvent('invalid-file-type', { fileName: file.name });
            return;
        }
        try {
            await processFile(file);
        } catch (error) {
            await logger.error('Error processing dropped file', { error, fileName: file.name });
        }
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
            try {
                await processFile(file);
            } catch (error) {
                await logger.error('Error processing selected file', { error, fileName: file.name });
            }
        }
    };
    input.click();
    logger.logUIEvent('dropzone-click');
});

// Theme Toggle
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;

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

// Optimize Code Blocks in project.json
function optimizeBlocks(blocks) {
    let optimizations = {
        removedDuplicates: 0,
        flattenedLoops: 0,
        unusedBlocks: 0,
        emptyBlocks: 0,
        simplifiedConditions: 0
    };

    const referencedBlocks = new Set(); // Track blocks that are referenced by others

    // Helper to check if a block is referenced
    function isBlockReferenced(blockId) {
        return referencedBlocks.has(blockId);
    }

    // Mark referenced blocks
    for (const blockId in blocks) {
        const block = blocks[blockId];
        if (block.parent) referencedBlocks.add(block.parent);
        if (block.next) referencedBlocks.add(block.next);
        if (block.inputs) {
            for (const input of Object.values(block.inputs)) {
                if (Array.isArray(input) && input[1]) {
                    referencedBlocks.add(input[1]);
                }
            }
        }
    }

    // Optimization Pass
    for (const blockId in blocks) {
        const block = blocks[blockId];

        // Remove duplicate blocks
        for (const otherBlockId in blocks) {
            if (
                blockId !== otherBlockId &&
                JSON.stringify(block) === JSON.stringify(blocks[otherBlockId])
            ) {
                delete blocks[otherBlockId];
                optimizations.removedDuplicates++;
            }
        }

        // Flatten nested loops
        if (block.opcode === "control_repeat" && block.inputs?.SUBSTACK) {
            const substackId = block.inputs.SUBSTACK[1];
            const substack = blocks[substackId];
            if (substack && substack.opcode === "control_repeat") {
                block.inputs.TIMES[1][1] *= substack.inputs.TIMES[1][1]; // Multiply loop counts
                block.inputs.SUBSTACK = substack.inputs.SUBSTACK; // Point to inner substack
                delete blocks[substackId];
                optimizations.flattenedLoops++;
            }
        }

        // Remove unused variables and procedures
        if (
            (block.opcode === "data_variable" || block.opcode === "procedures_definition") &&
            !isBlockReferenced(blockId)
        ) {
            delete blocks[blockId];
            optimizations.unusedBlocks++;
        }

        // Remove empty event blocks
        if (block.opcode.startsWith("event_") && !block.next) {
            delete blocks[blockId];
            optimizations.emptyBlocks++;
        }

        // Simplify conditions (e.g., "if true then")
        if (
            block.opcode === "control_if" &&
            block.inputs.CONDITION &&
            block.inputs.CONDITION[1][0] === "true"
        ) {
            const substackId = block.inputs.SUBSTACK[1];
            if (substackId) {
                blocks[substackId].parent = block.parent; // Reparent substack
                delete blocks[blockId];
                optimizations.simplifiedConditions++;
            }
        }
    }

    console.log("Optimization Summary:", optimizations);
    return blocks;
}

// Convert WAV ArrayBuffer to MP3 ArrayBuffer using lamejs
async function convertWavToMp3(wavArrayBuffer) {
    if (!window.lamejs) {
        console.error("lamejs is not loaded!");
        return; // Exit the function if lamejs is not loaded
    }
    // Parse WAV header
    const wavView = new DataView(wavArrayBuffer);
    const numChannels = wavView.getUint16(22, true);
    const sampleRate = wavView.getUint32(24, true);
    const bitsPerSample = wavView.getUint16(34, true);

    // Get audio data
    const wavData = new Int16Array(wavArrayBuffer, 44); // Skip WAV header

    // Initialize MP3 encoder
    const mp3encoder = new window.lamejs.Mp3Encoder(numChannels, sampleRate, 128);
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

// Progress and Log Functions
function updateProgress(status, percent) {
    const progressContainer = document.getElementById('progress-container');
    if (!progressContainer) return;

    progressContainer.style.display = 'block';
    const progressStatus = progressContainer.querySelector('.status');
    const progressPercentage = progressContainer.querySelector('.percentage');
    const progressFill = progressContainer.querySelector('.progress-fill');

    if (progressStatus) progressStatus.textContent = status;
    if (progressPercentage) progressPercentage.textContent = `${Math.round(percent)}%`;
    if (progressFill) progressFill.style.width = `${percent}%`;
}

function resetProgress() {
    const progressContainer = document.getElementById('progress-container');
    const logContainer = document.getElementById('log-container');
    const logContent = document.getElementById('log-content');
    const progressFill = progressContainer?.querySelector('.progress-fill');

    if (progressContainer) progressContainer.style.display = 'none';
    if (progressFill) progressFill.style.width = '0%';
    if (logContainer) logContainer.style.display = 'none';
    if (logContent) logContent.innerHTML = '';
}

function addLogEntry(message, level = 'info') {
    const logContainer = document.getElementById('log-container');
    const logContent = document.getElementById('log-content');
    if (!logContainer || !logContent) return;

    if (!logContainer.style.display || logContainer.style.display === 'none') {
        logContainer.style.display = 'block';
    }
    const entry = document.createElement('div');
    entry.className = `log-entry ${level}`;
    entry.textContent = message;
    logContent.appendChild(entry);
    logContent.scrollTop = logContent.scrollHeight;
}

// Toggle Logs Visibility
window.toggleLogs = function() {
    const content = document.getElementById('log-content');
    const icon = document.querySelector('.toggle-icon');
    if (content.classList.contains('collapsed')) {
        content.classList.remove('collapsed');
        icon.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('collapsed');
        icon.style.transform = 'rotate(-90deg)';
    }
};

// Update processFile function to show progress
async function processFile(file) {
    try {
        summaryDiv.innerHTML = `
            <div class="progress-bar">
                <div class="progress-bar-fill"></div>
                <div class="progress-text">0% Processing...</div>
            </div>
        `;
        
        const progressBar = summaryDiv.querySelector('.progress-bar-fill');
        const progressText = summaryDiv.querySelector('.progress-text');
        
        function updateProgress(percent, text) {
            progressBar.style.width = `${percent}%`;
            progressText.textContent = `${Math.round(percent)}% ${text}`;
        }

        // Initialize
        updateProgress(5, 'Starting optimization...');
        await logger.info(`Processing file: ${file.name}`);
        await loadDependencies();
        const originalSize = file.size;

        // Read the .sb3 file
        updateProgress(10, 'Reading file...');
        const zip = new JSZip();
        const contents = await zip.loadAsync(file);
        
        // Process project.json
        updateProgress(30, 'Processing project data...');
        let projectJson = JSON.parse(await contents.files["project.json"].async("text"));
        
        // Optimize blocks
        updateProgress(50, 'Optimizing blocks...');
        if (projectJson.blocks) {
            projectJson.blocks = optimizeBlocks(projectJson.blocks);
        }

        // Create new zip for optimized content
        updateProgress(70, 'Creating optimized project...');
        const optimizedZip = new JSZip();
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
                const optimizedPng = await optimizePng(content);
                optimizedZip.file(filename, optimizedPng);
            } else if (filename === 'project.json' || filename === 'sprite.json') {
                optimizedZip.file(filename, JSON.stringify(projectJson));
            } else {
                optimizedZip.file(filename, content);
            }
        }

        updateProgress(90, 'Finalizing...');
        const optimizedContent = await optimizedZip.generateAsync({
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: { level: 9 }
        });

        // Create download URL
        const downloadUrl = URL.createObjectURL(optimizedContent);
        const optimizedSize = optimizedContent.size;

        // Show results
        updateProgress(100, 'Complete!');
        const originalSizeMB = (originalSize / 1024 / 1024).toFixed(2);
        const optimizedSizeMB = (optimizedSize / 1024 / 1024).toFixed(2);
        const savings = (((originalSize - optimizedSize) / originalSize) * 100).toFixed(1);

        setTimeout(() => {
            summaryDiv.innerHTML = `
                <h2>File optimized successfully!</h2>
                <p><strong>Original File Size:</strong> ${originalSizeMB} MB</p>
                <p><strong>Optimized File Size:</strong> ${optimizedSizeMB} MB</p>
                <p><strong>Space Saved:</strong> ${savings}%</p>
            `;

            // Create download button
            const fileName = file.name.replace(/\.[^/.]+$/, '') + '_optimized.sb3';
            createDownloadButton(downloadUrl, fileName);
        }, 500);

        await logger.info(`File processed successfully: ${file.name}`);
    } catch (error) {
        console.error(error);
        summaryDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        await logger.error(`Error processing file: ${file.name}`, error);
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
