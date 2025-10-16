service APIMonitor @(path: '/api-monitor') {
    function testService() returns String;
    function getUIToken() returns String;

    action sendMonitoringRequest(
        RequestType: String,
        RequestBody: String
    ) returns String;
}