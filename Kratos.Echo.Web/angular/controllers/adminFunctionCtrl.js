(function () {

    'use-strict'

    var AdminFunctionCtrl = function ($scope, $uibModal, CommonService, AdminFunctionService) {

        var vm = this;
        
        this.functionTypes  = [];
        this.functions      = [];

        this.formData = {
            FunctionTypes: []
        };

        // load function type
        AdminFunctionService
            .getFunctionTypes({})
            .then(function (response) {
                console.log(response)
                vm.functionTypes = response.data;
            });

        // load function
        AdminFunctionService
            .getFunctions({})
            .then(function (response) {
                console.log(response)
                vm.functions = response.data;
            });


        // create function
        this.create = function () {
            $uibModal.open({
                templateUrl: 'angular/templates/partails/create_function.html',
                size: 'lg',
                scope: $scope,
                controller: function ($scope, $uibModalInstance) {

                    $scope.ok = function (data) {
                        AdminFunctionService.createFunction(data)
                        .then(function (response) {
                            $uibModalInstance.close();
                        });
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                }
            });
        };

        // edit function
        this.edit = function (item) {
            $uibModal.open({
                templateUrl: 'angular/templates/partails/create_function.html',
                size: 'lg',
                controller: function ($scope, $uibModalInstance) {

                    $scope.formData = {
                        FunctionType: item.Name
                    };

                    $scope.ok = function (data) {
                        AdminFunctionService.updateFunctionType(data)
                        .then(function (response) {
                            $uibModalInstance.close(response);
                        });
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                }
            });
        };

        // delete function
        this.delete = function (item) {
            CommonService.modalConfirm('Are you sure!!')
            .then(function (data) {

            });
        };

    };

    // inject
    angular.module('kratosEcho.product')
    .controller('AdminFunctionCtrl', AdminFunctionCtrl);

})()