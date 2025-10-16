const LOG_LEVEL = {
    ERROR: 'ERROR',
    INFO: 'INFO'
}

const LOG_ACTION = {
    SEND_REQUEST: {
        STATUS: 'API Monitoring | Status Request',
        GET: 'API Monitoring | Get Request',
        RESEND: 'API Monitoring | Resend Request',
        CANCEL: 'API Monitoring | Cancel Request'
    }
}

const STATUS_CODES = {
    SUCCESS: 200,
    ERROR: 500,
    INVALID_PAYLOAD_ERROR: 400
}

const DEST_ENDPOINT = {
    STATUS: 'API_MONITORING_STATUS',
    GET: 'API_MONITORING_GET',
    RESEND: 'API_MONITORING_RESEND',
    CANCEL: 'API_MONITORING_CANCEL'
}

const HTTPS = 'https://'
const CPI_HOST = 'dev.api.ferrero.com'

module.exports = Object.freeze({
    LOG_LEVEL,
    LOG_ACTION,
    STATUS_CODES,
    DEST_ENDPOINT,
    CPI_HOST,
    HTTPS
})