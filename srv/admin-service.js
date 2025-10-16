const cds = require('@sap/cds');
const cpi = require('./cpi');
const { STATUS_CODES } = require('./constants');
const logs = require('./logger'); 

module.exports = cds.service.impl((srv) => {
    srv.on('testService', async (req) => {
        return "Successfully called backend!"
    });

    srv.on('sendMonitoringRequest', async (req) => {
        const response = await cpi.sendRequest(req);

        if(response.code !== STATUS_CODES.SUCCESS){
            return JSON.stringify(response.message)
        } else {
            return JSON.stringify(response.message)
        }
    });

    srv.on('getUIToken', async () => {
        return;
    })
});