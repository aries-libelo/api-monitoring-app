sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/base/Log"
], (BaseController, JSONModel, MessageBox, Log) => {
    "use strict";

    return BaseController.extend("com.sap.cep.apimonitoringapp.apimonitorui.controller.Homepage", {
        onInit: function() {
            const oRequestType = {
                RequestType: [ 
                    {key: 'STATUS', text: 'Status API'}, 
                    {key: 'GET', text: 'Get API'},
                    {key: 'RESEND', text: 'Resend API'}, 
                    {key: 'CANCEL', text: 'Cancel API'}
                ]
            };
            const oRequestTypeModel = new JSONModel(oRequestType);
            this.getView().setModel(oRequestTypeModel, "RequestTypeModel");
        },

        onSend: function() {
            this.loadBusyIndicator();
            // const oResponseArea = this.getId("RequestResponse");
            const oRequestArea = this.getId("RequestBody");
            const sRequestType = this.getId("slctRequestType").getSelectedKey();

            // oResponseArea.setValue("Response is shown here");

            const sRequestText = oRequestArea ? oRequestArea.getValue() : "";

            const oRequestPayload = {
                RequestType: sRequestType,
                RequestBody: sRequestText
            };

            this.resolveRequest(oRequestPayload);
        },

        onPressCopy: function(oEvent) {
            const oResponseArea = this.getId("RequestResponse");
            const sResponse = oResponseArea.getValue();

            navigator.clipboard.writeText(sResponse).then(() => {
                MessageToast.show("Text copied to clipboard!");
            }).catch(err => {
                MessageToast.show("Failed to copy text");
                console.error("Clipboard error:", err);
            });
        },

        onSelectionChange: function() {
            // const oResponseArea = this.getId("RequestResponse");
            const oRequestArea = this.getId("RequestBody");

            // oResponseArea.setValue("");
            oRequestArea.setValue("");
            oRequestArea.setEnabled(true);
        },

        resolveRequest: function(oRequestPayload) {
            const oResponseArea = this.getId("RequestResponse");
            // const oRequestArea = this.getId("RequestBody");
            // oRequestArea.setValue = sRequestText;

            // console.log(oRequestPayload);

            // var sCurrent = oRequestArea && typeof oRequestArea.getValue === "function"
            //        ? oRequestArea.getValue()
            //        : sRequestText;

            // console.log(`Feed input: ${sRequestText}`);
            // console.log(`payload: ${oRequestPayload}`)

            fetch(`${jQuery.sap.getModulePath("com/sap/cep/apimonitoringapp/apimonitorui")}/api-monitor/getUIToken()`, {
                    method: "GET",
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "X-CSRF-Token": "Fetch",
                        "Content-Type": "application/atom+xml",
                    },
                }).then((response) => {
                    this._csrfToken = response.headers.get("X-Csrf-Token");
                    fetch(`${jQuery.sap.getModulePath("com/sap/cep/apimonitoringapp/apimonitorui")}/api-monitor/sendMonitoringRequest`, {
                        method: "POST",
                        body: JSON.stringify(oRequestPayload),
                        headers: {
                            Accept: "application/json;odata.metadata=minimal;IEEE754Compatible=true",
                            "Content-Type": "application/json;charset=UTF-8;IEEE754Compatible=true",
                            "X-Requested-With": "XMLHttpRequest",
                            "X-CSRF-Token": this._csrfToken,
                        },
                    }).then((res) => res.json()
                ).then((data) => {
                    const oResponseData = JSON.parse(data.value);
                    // console.log(data)
                    oResponseArea.setValue(oResponseData.msg);
                    this.hideBusyIndicator();
                }).catch((error) => {
                    this.hideBusyIndicator();
                    Log.error(`Error encountered when sending request: ${error}`)
                    MessageBox.error(this.getResourceBundle().getText('errorMessage_SendRequest'));
                });
            }).catch((error) => {
                this.hideBusyIndicator();
                Log.error(`Error retrieving data: ${error}`)
                MessageBox.error(this.getResourceBundle().getText('errorMessage_SendRequest'));
            })
        }
    });
});