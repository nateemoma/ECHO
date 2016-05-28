(function () {

    'use-strict'
    
    var adminProductService = function ($http, serviceUrl) {

        var service = {};

        // create product
        service.create = function (model, files) {
            return $http({
                method: 'POST',
                url: serviceUrl + '/Product/AddNew3',
                headers: { 'Content-Type': undefined },
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append('model', angular.toJson(data.model));
                    for (var i = 0; i < data.files.length; i++) {
                        formData.append('file' + i, data.files[i]);
                    }
                    return formData;
                },
                data: { model: model, files: files }
            });
        };

        return service;
    };

    // inject
    angular.module('kratosEcho.service')
    .factory('adminProductService', adminProductService);
    

})()