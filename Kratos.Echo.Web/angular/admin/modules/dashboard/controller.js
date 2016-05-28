(function () {

    'use-strict';

    var AdminDashboardController = function($location) {
        this.hello = 'Dashboard';
    };

    // inject
    angular.module('KratosEcho.dashboard')
    .controller('AdminDashboardController', AdminDashboardController);

})()