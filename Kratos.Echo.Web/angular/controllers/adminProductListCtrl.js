(function () {

    'use-strict'

    var AdminProductListCtrl = function ($location) {
        this.hello = 'Dashboard';
    };

    // inject
    angular.module('kratosEcho.product')
    .controller('AdminProductListCtrl', AdminProductListCtrl);

})()