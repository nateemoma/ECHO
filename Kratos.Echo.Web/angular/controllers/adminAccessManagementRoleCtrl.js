(function () {

    'use-strict'

    var AdminAccessManagementRoleCtrl = function ($scope, $uibModal, CommonService, AdminAccessManagementService) {

        var vm = this;
        
        this.functionTypes  = [];
        this.functions      = [];
        this.roles          = [];

        this.formData = {
            Fuetrues: []
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

        // load role
        AdminAccessManagementService
            .getRoles({})
            .then(function (response) {
                console.log(response)
                vm.roles = response.data;
            });

        // create role
        this.create = function () {
            $uibModal.open({
                templateUrl: 'angular/templates/partails/create_role.html',
                size: 'lg',
                //scope: $scope,
                controller: function ($scope, $uibModalInstance) {

                    $scope.formData         = angular.copy(vm.formData);
                    $scope.functions        = angular.copy(vm.functions);
                    $scope.functionTypes    = null;

                    $scope.functionChanges = function (func) {
                        $scope.functionTypes = func.FunctionTypes;
                    };

                    $scope.addAccessPrivileges = function (data) {

                        var funcTypes = [];

                        angular.forEach($scope.functionTypes, function (item) {
                            if (item.Checked !== undefined && item.Checked == true) {
                                funcTypes.push(item);
                            }
                        });

                        // tranfrom data
                        var accessPrivilege = {
                            FunctionId      : data.Id,
                            Name            : data.Name,
                            Path            : data.Path,
                            FunctionTypes   : funcTypes
                        };

                        $scope.formData.Fuetrues.push(accessPrivilege);

                        // clear function type checked = false
                        angular.forEach($scope.functionTypes, function (item) {
                            item.Checked = false;
                        });
                    };

                    $scope.editAccessPrivilege = function (data) {
                        console.log(data)
                        $scope.functionOption = data;
                    };

                    // delete
                    $scope.deleteAccessPrivilege = function (data) {
                        var index = $scope.formData.Fuetrues.indexOf(data);
                        if (index > -1) {
                            $scope.formData.Fuetrues.splice(index, 1);
                        }
                    };

                    $scope.ok = function (data) {

                        AdminAccessManagementService.createRole(data)
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

        // edit role
        this.edit = function (item) {
            console.log(item)
            $uibModal.open({
                templateUrl: 'angular/templates/partails/create_role.html',
                size: 'lg',
                controller: function ($scope, $uibModalInstance) {

                    $scope.formData = {
                        Id              : item.Id,
                        Name            : item.Name,
                        Fuetrues        : [], //item.Functions,
                        Active          : item.Active
                    };

                    $scope.functions        = angular.copy(vm.functions);
                    $scope.functionTypes    = $scope.functions.FunctionTypes;

                    $scope.functionChanges = function (func) {
                        $scope.functionTypes = func.FunctionTypes;
                    };

                    $scope.addAccessPrivileges = function (data) {

                        var funcTypes = [];

                        angular.forEach($scope.functionTypes, function (item) {
                            if (item.Checked !== undefined && item.Checked == true) {
                                funcTypes.push(item);
                            }
                        });

                        // tranfrom data
                        var accessPrivilege = {
                            FunctionId      : data.Id,
                            Name            : data.Name,
                            Path            : data.Path,
                            FunctionTypes   : funcTypes
                        };

                        $scope.formData.Fuetrues.push(accessPrivilege);

                        // clear function type checked = false
                        angular.forEach($scope.functionTypes, function (item) {
                            item.Checked = false;
                        });
                    };

                    angular.forEach(item.Functions, function (privilege) {
                        $scope.addAccessPrivileges(privilege);
                    })

                    $scope.editAccessPrivilege = function (data) {
                        console.log(data)
                    };

                    // delete
                    $scope.deleteAccessPrivilege = function (data) {
                        var index = $scope.formData.Fuetrues.indexOf(data);
                        if (index > -1) {
                            $scope.formData.Fuetrues.splice(index, 1);
                        }
                    };

                    $scope.ok = function (data) {

                        AdminAccessManagementService.updateRole(data)
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
    .controller('AdminAccessManagementRoleCtrl', AdminAccessManagementRoleCtrl);

})()