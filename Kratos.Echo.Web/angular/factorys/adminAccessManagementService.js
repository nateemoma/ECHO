(function () {

    'use-strict'
    
    var AdminAccessManagementService = function ($http, serviceUrl) {

        var service = {};

        //----------------------------------------------------//
        //---------- Start Function Type Services ------------//
        //----------------------------------------------------//

        // get function type
        service.getFunctionTypes = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/GetAllFunctionType',
                data: params
            });
        };

        // create function type
        service.createFunctionType = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/AddNewFunctionType',
                data: params
            });
        };

        // update function type
        service.updateFunctionType = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/UpdateFunctionType',
                data: params
            });
        };

        // delete function type
        service.deleteFunctionType = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/DeleteFunctionType',
                data: params
            });
        };

        //----------------------------------------------------//
        //----------- Start Function Services ----------------//
        //----------------------------------------------------//

        // get function
        service.getFunctions = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/GetAllFunction',
                data: params
            });
        };

        // create function
        service.createFunction = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/AddNewFunction',
                data: params
            });
        };

        // update function
        service.updateFunction = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/UpdateFunction',
                data: params
            });
        };

        // delete function
        service.deleteFunction = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/DeleteFunction',
                data: params
            });
        };

        //----------------------------------------------------//
        //--------------- Start Role Services ----------------//
        //----------------------------------------------------//

        // get role
        service.getRoles = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/GetAllRole',
                data: params
            });
        };

        // create role
        service.createRole = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/AddNewRole',
                data: params
            });
        };

        // update role
        service.updateRole = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/UpdateRole',
                data: params
            });
        };

        // update role
        service.deleteRole = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/DeleteRole',
                data: params
            });
        };


        //----------------------------------------------------//
        //-------- Start AddNewOrganization Services ---------//
        //-------------------------------------------- -------//

        // get organization
        service.getOrganizations = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/GetOrganization',
                data: params
            });
        };

        // create organization
        service.createOrganization = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/AddNewOrganization',
                data: params
            });
        };

        // update organization
        service.updateOrganization = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/UpdateOrganization',
                data: params
            });
        };

        // delete organization
        service.deleteOrganization = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/DeleteOrganization',
                data: params
            });
        };

        //----------------------------------------------------//
        //----------- Start User Login Services --------------//
        //-------------------------------------------- -------//

        // get login user
        service.getLoginUsers = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/GetAllLoginUser',
                data: params
            });
        };

        // create login user
        service.createLoginUser = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/AddNewLoginUser',
                data: params
            });
        };

        // update login user
        service.updateOrganization = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/UpdateLoginUser',
                data: params
            });
        };

        // delete login user
        service.deleteOrganization = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/DeleteLoginUser',
                data: params
            });
        };

        return service;
    };

    // inject
    angular.module('kratosEcho.service')
    .factory('AdminAccessManagementService', AdminAccessManagementService);
    

})()