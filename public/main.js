const dropzone = document.getElementById("dropzone");
const summaryDiv = document.getElementById("summary");

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
        await uploadFile(file);
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
            await uploadFile(file);
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

        // Save theme preference in localStorage
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    });
});

async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    summaryDiv.innerHTML = "<p>Processing...</p>";

    try {
        const response = await fetch("/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.originalFileSize || !data.optimizedFileSize || !data.downloadUrl) {
            throw new Error("Missing expected data from server.");
        }

        const originalFileSizeMB = (data.originalFileSize / 1024 / 1024).toFixed(2);
        const optimizedFileSizeMB = (data.optimizedFileSize / 1024 / 1024).toFixed(2);

        // Show the download button and details
        summaryDiv.innerHTML = `
            <h2>File optimized successfully!</h2>
            <p><strong>Original File Size:</strong> ${originalFileSizeMB} MB</p>
            <p><strong>Optimized File Size:</strong> ${optimizedFileSizeMB} MB</p>
        `;

        // Create the download button after the process is complete
        const downloadUrl = data.downloadUrl; // Vs Generic Label: "Optimized SB3 File."
        const fileName = downloadUrl.split('/').pop();  // Extract from the URL
        createDownloadButton(downloadUrl, fileName);

    } catch (err) {
        console.error(err);
        summaryDiv.innerHTML = `<p style="color: red;">Error: ${err.message}</p>`;
    }
}

// Update Progress Bar Element
function updateProgress(percent) {
    const progress = document.getElementById("progress");
    progress.style.width = `${percent}%`;
}

// Create Download Button
function createDownloadButton(fileUrl, fileName) {
    const existingButton = document.getElementById("downloadButton");
    if (existingButton) existingButton.remove(); // Remove old button if any

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