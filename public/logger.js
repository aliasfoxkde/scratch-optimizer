// Logger utility for Scratch Optimizer
class Logger {
    constructor(options = {}) {
        this.logQueue = [];
        this.isProcessing = false;
        this.logDir = './logs';
        this.currentLogFile = null;
        this.devMode = options.devMode || false;
        this.initializeLogger();
    }

    async initializeLogger() {
        try {
            await window.api.ensureDir(this.logDir);
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            this.currentLogFile = `${this.logDir}/scratch-optimizer-${timestamp}.log`;
            this.info('Logger initialized');
        } catch (error) {
            if (this.devMode) {
                console.error('Failed to initialize logger:', error);
            }
        }
    }

    formatLogMessage(level, message, details = null) {
        const timestamp = new Date().toISOString();
        let formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
        if (details) {
            formattedMessage += `\nDetails: ${JSON.stringify(details, null, 2)}`;
        }
        return formattedMessage;
    }

    async writeToFile(message) {
        if (!this.currentLogFile) return;
        
        try {
            await window.api.appendFile(this.currentLogFile, message + '\n');
        } catch (error) {
            if (this.devMode) {
                console.error('Failed to write to log file:', error);
            }
        }
    }

    async processLogQueue() {
        if (this.isProcessing || this.logQueue.length === 0) return;
        
        this.isProcessing = true;
        while (this.logQueue.length > 0) {
            const logEntry = this.logQueue.shift();
            await this.writeToFile(logEntry);
        }
        this.isProcessing = false;
    }

    consoleLog(level, message, details) {
        if (!this.devMode) return;
        
        const consoleMethod = {
            'INFO': 'log',
            'WARN': 'warn',
            'ERROR': 'error',
            'DEBUG': 'debug'
        }[level] || 'log';

        if (details) {
            console[consoleMethod](message, details);
        } else {
            console[consoleMethod](message);
        }
    }

    // Log levels
    async info(message, details = null) {
        const logMessage = this.formatLogMessage('INFO', message, details);
        this.consoleLog('INFO', message, details);
        this.logQueue.push(logMessage);
        this.processLogQueue();
    }

    async warn(message, details = null) {
        const logMessage = this.formatLogMessage('WARN', message, details);
        this.consoleLog('WARN', message, details);
        this.logQueue.push(logMessage);
        this.processLogQueue();
    }

    async error(message, details = null) {
        const logMessage = this.formatLogMessage('ERROR', message, details);
        this.consoleLog('ERROR', message, details);
        this.logQueue.push(logMessage);
        this.processLogQueue();
    }

    async debug(message, details = null) {
        const logMessage = this.formatLogMessage('DEBUG', message, details);
        this.consoleLog('DEBUG', message, details);
        this.logQueue.push(logMessage);
        this.processLogQueue();
    }

    // Special logging methods
    async logOptimization(fileType, originalSize, newSize, details = null) {
        const optimization = {
            fileType,
            originalSize: `${(originalSize / 1024).toFixed(2)}KB`,
            newSize: `${(newSize / 1024).toFixed(2)}KB`,
            reduction: `${((1 - newSize / originalSize) * 100).toFixed(2)}%`,
            ...details
        };
        await this.info(`File optimization completed for ${fileType}`, optimization);
    }

    async logUIEvent(eventType, details = null) {
        await this.debug(`UI Event: ${eventType}`, details);
    }

    async logError(error, context = '') {
        const errorDetails = {
            message: error.message,
            stack: error.stack,
            context
        };
        await this.error(`Error occurred${context ? ` in ${context}` : ''}`, errorDetails);
    }

    async logProgress(action, progress, total) {
        const percentage = ((progress / total) * 100).toFixed(1);
        await this.info(`Progress: ${action} - ${percentage}%`, { progress, total });
    }

    // Dev mode toggle
    setDevMode(enabled) {
        this.devMode = enabled;
        this.info(`Dev mode ${enabled ? 'enabled' : 'disabled'}`);
    }
}

// Create global logger instance with dev mode based on URL parameter or localStorage
const devMode = new URLSearchParams(window.location.search).has('dev') || 
                localStorage.getItem('devMode') === 'true';
window.logger = new Logger({ devMode });
