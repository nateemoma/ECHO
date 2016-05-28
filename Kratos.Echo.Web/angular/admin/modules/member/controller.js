(function () {

    'use-strict';

    var AdminMemberController = function($scope) {
        this.hello = 'Member';
        $scope.hello = 'Member';
    };

    // inject
    angular.module('KratosEcho.member')
    .controller('AdminMemberController', AdminMemberController);

})()