const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs').promises;
const path = require('path');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    'api', {
        ensureDir: async (dirPath) => {
            try {
                await fs.mkdir(dirPath, { recursive: true });
            } catch (error) {
                if (error.code !== 'EEXIST') {
                    throw error;
                }
            }
        },
        appendFile: async (filePath, data) => {
            await fs.appendFile(filePath, data, 'utf8');
        }
    }
);
