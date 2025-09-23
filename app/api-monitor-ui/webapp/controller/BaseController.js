sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/BusyIndicator"
],
function (Controller, BusyIndicator) {
    "use strict";

    return Controller.extend("com.sap.cep.apimonitoringapp.apimonitorui.controller.BaseController",{
        /**
             * Convenience method for getting the component model by name in every controller of the application
             * @public
             * @param {string} sName - the component model name
             * @returns {sap.ui.model.Model} - the model instance
             */
        getComponentModel: function (sName) {
            return this.getOwnerComponent().getModel(sName);
        },

        /**
             * Convenience method for getting the component model by name in every controller of the application
             * @public
             * @param {string} sName the element id
             * @returns
             */
        getComponentId: function (sName) {
            return this.getOwnerComponent().byId(sName);
        },

        /**
         * Convenience method for getting the view model by name in every controller of the application.
         * @public
         * @param {string} sName - the model name
         * @returns {sap.ui.model.Model} - the model instance
         */
        getModel: function (sName) {
            return this.getView().getModel(sName);
        },

        /**
         * Convenience method for getting the view model by name in every controller of the application.
         * @public
         * @param {string} sName the element id
         * @returns
         */
        getId: function (sName) {
            return this.getView().byId(sName);
        },

        /**
         * Convenience method for getting the resource bundle.
         * @public
         * @returns {sap.ui.model.resource.ResourceModel} - the resourceModel of the component
         */
        getResourceBundle: function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },
        
        loadBusyIndicator: function () {
            BusyIndicator.show();
        },
        
        hideBusyIndicator: function () {
            BusyIndicator.hide();
        }
    })
});