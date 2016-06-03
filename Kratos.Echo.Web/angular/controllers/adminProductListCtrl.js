(function () {

    'use-strict'

    var AdminProductListCtrl = function ($scope, AdminProductService) {
        
        var vm = this;

        this.products = [];


        AdminProductService.getProducts({})
        .success(function (response) {
            console.log(response)
            vm.products = response;
        })
        .error(function (error, status) {
            console.log(error)
        })
        
    };

    // inject
    angular.module('kratosEcho.product')
    .controller('AdminProductListCtrl', AdminProductListCtrl);

})()