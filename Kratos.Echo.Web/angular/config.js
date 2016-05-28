(function () {

    'use-strict'

    var config = function () {
        this.settings = {
            templateUrl: 'angular/templates',
            serviceUrl: 'http://localhost:1341'
        };

        this.get = function (key) { return this.settings[key]; };
    }

    // inject
    angular.module('kratosEcho.service')
    .service('config', config);

})()