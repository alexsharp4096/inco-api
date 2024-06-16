const {Logging} = require('@google-cloud/logging');
const logging = new Logging()
const log = logging.log('log')
const resource = {
    type: 'global', // You can change this to a more specific resource type if needed
};


export type Level =
    'error' |
    'warn' |
    'info' |
    'http' |
    'verbose' |
    'debug' ;




export async function writeLog(severity, message, additionalData = {}) {
    const entry = log.entry({ resource, severity, ...additionalData }, message);
    try {
        await log.write(entry);
    } catch (error) {
        console.error('Failed to write log:', error);
    }
}

export function logDebug(message) : void {
    writeLog(message, "debug");
}
export function logWarn(message) : void {
    writeLog(message, "warn");
}
export function logInfo(message) : void {
    writeLog(message, "info");
}
export function logError(message) : void {
    writeLog(message, "error");
}
