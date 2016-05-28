(function () {

    'use-strict'
    
    var AdminFunctionService = function ($http, serviceUrl) {

        var service = {};

        // get function type
        service.getFunctionTypes = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/GetAllFunctionType',
                data: params
            });
        };

        // get function
        service.getFunctions = function (params) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/AccessManagement/GetAllFunction',
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

        return service;
    };

    // inject
    angular.module('kratosEcho.service')
    .factory('AdminFunctionService', AdminFunctionService);
    

})()