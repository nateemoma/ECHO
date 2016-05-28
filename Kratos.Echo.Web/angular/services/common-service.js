(function () {

    'use-strict'

    var CommonService = function ($uibModal, $q, config) {

        var service = {};

        var templateUrl = config.get('templateUrl') + '/common';

        service.modalConfirm = function (messages) {
            var deferred = $q.defer();
            var modelConfirmmation = $uibModal.open({
                templateUrl: templateUrl + '/modal-confirm.html',
                backdrop: 'static',
                controller: (function ($scope, $uibModalInstance, messages) {
                    $scope.messages = messages;
                    $scope.ok = function () {
                        $uibModalInstance.close('ok');
                    };
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }),
                resolve: {
                    messages: function () {
                        return messages;
                    }
                }
            }).result.then(function (data) {
                deferred.resolve(data);
            }, function (data) {
                deferred.reject(data);
            });

            return deferred.promise;
        };

        service.modalInfo = function (messages) {
            var deferred = $q.defer();
            var modelConfirmmation = $uibModal.open({
                templateUrl: templateUrl + '/modal-info.html',
                backdrop: 'static',
                controller: (function ($scope, $uibModalInstance, messages) {
                    $scope.messages = messages;

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }),
                resolve: {
                    messages: function () {
                        return messages;
                    }
                }
            }).result.then(function (data) {
                deferred.resolve(data);
            }, function (data) {
                deferred.reject(data);
            });

            return deferred.promise;
        };

        return service;

    };

    // inject
    angular.module('kratosEcho.service')
    .service('CommonService', CommonService);

})()