(function () {

    'use-strict'

    var AdminAccessManagementFunctionCtrl = function ($scope, $uibModal, CommonService, AdminAccessManagementService) {

        var vm = this;
        
        this.functionTypes  = [];
        this.functions      = [];

        this.formData = {
            FunctionTypes: []
        };

        // load function type
        AdminAccessManagementService
            .getFunctionTypes({})
            .then(function (response) {
                console.log(response)
                vm.functionTypes = response.data;
            });

        // load function
        AdminAccessManagementService
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
                //scope: $scope,
                controller: function ($scope, $uibModalInstance) {

                    $scope.formData         = angular.copy(vm.formData);
                    $scope.functionTypes    = angular.copy(vm.functionTypes);

                    $scope.ok = function (data) {

                        // check function type checked
                        angular.forEach($scope.functionTypes, function (item) {
                            if (item.Checked !== undefined && item.Checked == true) {
                                data.FunctionTypes.push(item);
                            }
                        });

                        console.log(data)

                        AdminAccessManagementService.createFunction(data)
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

        // edit function
        this.edit = function (item) {
            $uibModal.open({
                templateUrl: 'angular/templates/partails/create_function.html',
                size: 'lg',
                controller: function ($scope, $uibModalInstance) {

                    $scope.formData = {
                        Id              : item.Id,
                        FunctionPath    : item.Path,
                        FunctionName    : item.Name,
                        FunctionUrl     : item.Url,
                        FunctionTypes   : item.FunctionTypes,
                        Active          : item.Active
                    };

                    $scope.functionTypes = angular.copy(vm.functionTypes);

                    angular.forEach($scope.functionTypes, function (functionType) {
                        angular.forEach(item.FunctionTypes, function (_functionType) {
                            if (functionType.Id === _functionType.Id) {
                                functionType.Checked = true;
                            }
                        });
                    });


                    $scope.ok = function (data) {

                        // clear function type
                        data.FunctionTypes = [];

                        // check function type checked
                        angular.forEach($scope.functionTypes, function (item) {
                            if (item.Checked !== undefined && item.Checked == true) {
                                data.FunctionTypes.push(item);
                            }
                        });

                        console.log(data)

                        AdminAccessManagementService.updateFunction(data)
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
    .controller('AdminAccessManagementFunctionCtrl', AdminAccessManagementFunctionCtrl);

})()