sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (BaseController, JSONModel, MessageToast) => {
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
            const oResponseArea = this.getId("RequestResponse");
            const oRequestArea = this.getId("RequestBody");

            oResponseArea.setValue("Response is shown here");

            const sRequestText = oRequestArea ? oRequestArea.getValue() : "";

            const oRequestPayload = {};

            this.resolveRequest(sRequestText, oRequestPayload);
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
            const oResponseArea = this.getId("RequestResponse");
            const oRequestArea = this.getId("RequestBody");

            oResponseArea.setValue("");
            oRequestArea.setValue("");
        },

        resolveRequest: function(sRequestText, oRequestPayload) {
            // const oRequestArea = this.getId("RequestBody");
            // oRequestArea.setValue = sRequestText;

            // console.log(oRequestPayload);

            // var sCurrent = oRequestArea && typeof oRequestArea.getValue === "function"
            //        ? oRequestArea.getValue()
            //        : sRequestText;

            console.log(`Feed input: ${sRequestText}`);
            console.log(`payload: ${oRequestPayload}`)
        }
    });
});