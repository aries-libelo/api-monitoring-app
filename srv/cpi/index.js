const { getDestinationFromDestinationService } = require('@sap-cloud-sdk/connectivity');
const { buildHttpRequest } = require('@sap-cloud-sdk/http-client');
const https = require('https');
const { LOG_LEVEL, LOG_ACTION, STATUS_CODES, DEST_ENDPOINT, CPI_HOST, HTTPS } = require('../constants');
const logs = require("../logger");

const cpi = {};

async function getDestinationDetails (requestType){
    const destination = {};
    let sLogMessage = '';
    try {
        const sDestinationName = DEST_ENDPOINT[requestType];
        const oDestination = await getDestinationFromDestinationService({ destinationName: sDestinationName });
        if(oDestination){
            const oRequestConfig = await buildHttpRequest(oDestination);
            const url = oRequestConfig.baseURL;
            const path = url.replace(HTTPS + CPI_HOST, '');

            const httpsAgent = oRequestConfig.httpsAgent;
            const proxy = httpsAgent.options;

            const pfx = proxy.pfx;
            destination.pfx = pfx;

            const passphrase = proxy.passphrase;
            destination.passphrase = passphrase;

            destination.host = CPI_HOST;
            destination.path = path;
            
            return destination;
        }
        sLogMessage = `No destination found for API Monitoring | ${requestType} endpoint`;
        logs(LOG_LEVEL.INFO, LOG_ACTION.GetDestinationDetails, sLogMessage);
        return null
    } catch (e) {
        sLogMessage = `Error retrieving destination details for API Monitoring | ${requestType} endpoint`;
        logs(LOG_LEVEL.ERROR, LOG_ACTION.GetDestinationDetails, sLogMessage);
    }
}

cpi.sendRequest = async (req) => {
    const data = req.data;
    const sRequestType = data.RequestType;
    const sBody =  data.RequestBody;

    const destination = await getDestinationDetails(sRequestType);

    const options = {
        hostname: destination.host,
        path: destination.path,
        method: 'POST',
        pfx: destination.pfx,
        passphrase: destination.passphrase,
        headers: {
            'Content-Type': 'application/xml'
        }
    }

    const returnRes = {message:{}}

    logs(LOG_LEVEL.INFO, LOG_ACTION.SEND_REQUEST[sRequestType], `Calling API Monitoring | ${sRequestType} endpoint ...`)

    const cpiCall = new Promise((resolve, reject) => {
        const cpiReq = https.request(options, (res) => {
            returnRes.code = res.statusCode;

            const dataChunks = [];

            res.on('data', (chunk) => {
                dataChunks.push(chunk);
            });

            res.on('end', () => {
                const concatChunk = Buffer.concat(dataChunks);
                const response = concatChunk.toString();

                returnRes.message.msg = response;
                if(returnRes.code !== STATUS_CODES.SUCCESS) logs(LOG_LEVEL.INFO, LOG_ACTION.SEND_REQUEST[sRequestType], `An Issue was encountered while calling API Monitoring | ${sRequestType} Endpoint: ${JSON.stringify(returnRes.message.msg)}`);
                resolve(returnRes);
            })
        });

        cpiReq.on('error', (err) => {
            returnRes.code = err.statusCode;
            returnRes.message.msg = JSON.parse(err)
            logs(LOG_LEVEL.ERROR, LOG_ACTION.SEND_REQUEST[sRequestType], `An error was encountered while calling for API Monitoring | ${sRequestType} Endpoint: ${err}`)
            reject(returnRes);
        })

        cpiReq.write(sBody);
        cpiReq.end();
    })

    const oResponse = await cpiCall;

    return oResponse;
}

module.exports = cpi;