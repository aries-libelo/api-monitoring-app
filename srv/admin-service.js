const cds = require('@sap/cds');

module.exports = cds.service.impl((srv) => {
    srv.on('testService', async (req) => {
        return "Successfully called backend!"
    });
});