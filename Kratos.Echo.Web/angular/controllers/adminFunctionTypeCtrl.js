(function () {

    'use-strict'

    var AdminFunctionTypeCtrl = function ($uibModal, CommonService, AdminFunctionService) {

        var vm              = this;

        this.formData       = {};
        this.functionTypes  = [];

        // load function type
        AdminFunctionService
            .getFunctionTypes({})
            .then(function (response) {
                vm.functionTypes = response.data;
            });


        // create function type
        this.create = function () {
            $uibModal.open({
                templateUrl: 'angular/templates/partails/create_function_type.html',
                size: 'lg',
                controller: function ($scope, $uibModalInstance) {

                    $scope.formData = {};

                    $scope.ok = function (data) {
                        AdminFunctionService.createFunctionType(data)
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

        // edit function type
        this.edit = function (item) {
            $uibModal.open({
                templateUrl: 'angular/templates/partails/create_function_type.html',
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

        // delete function type
        this.delete = function (item) {
            CommonService.modalConfirm('Are you sure!!')
            .then(function (data) {

            });
        };

    };

    // inject
    angular.module('kratosEcho.product')
    .controller('AdminFunctionTypeCtrl', AdminFunctionTypeCtrl);

})()