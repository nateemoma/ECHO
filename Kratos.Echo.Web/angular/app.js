(function () {

    'use-strict';

    // decaler modules
    angular.module('kratosEcho.dashboard',  []);
    angular.module('kratosEcho.member',     []);
    angular.module('kratosEcho.product',    []);
    angular.module('kratosEcho.report',     []);

    angular.module('kratosEcho.directive',  []);
    angular.module('kratosEcho.filter',     []);
    angular.module('kratosEcho.service',    []);


    angular.module('kratosEcho', [
        'kratosEcho.dashboard',
        'kratosEcho.member',
        'kratosEcho.product',
        'kratosEcho.report',

        'kratosEcho.directive',
        'kratosEcho.filter',
        'kratosEcho.service',

        'ngAnimate',
        'ui.router',
        'ui.bootstrap'
    ]);

    var router = function ($stateProvider, $urlRouterProvider, $locationProvider, $controllerProvider) {

        /*Creating a more synthesized form of service of $ controllerProvider.register*/
        angular.module('kratosEcho').registerCtrl = $controllerProvider.register;

        function loadScript(path) {
            var result = $.Deferred(),
            script = document.createElement("script");
            script.async = "async";
            script.type = "text/javascript";
            script.src = path;
            script.onload = script.onreadystatechange = function (_, isAbort) {
                if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                    if (isAbort)
                        result.reject();
                    else
                        result.resolve();
                }
            };
            script.onerror = function () { result.reject(); };
            document.querySelector("body").appendChild(script);
            return result.promise();
        }

        function loader(arrayName) {

            return {
                load: function ($q) {
                    var deferred = $q.defer(),
                    map = arrayName.map(function (name) {
                        return loadScript(name);
                    });

                    $q.all(map).then(function (r) {
                        deferred.resolve();
                    });

                    return deferred.promise;
                }
            };
        }

        var seller = {
            'home': {
                name: 'home',
                url: '/seller/home',
                template: '<div><div ui-view> Hello Home </div></div>',
                //controller: ''
            },
            'login': {
                name: 'login',
                url: '/seller/login',
                template: '<div><div ui-view> Hello Login </div></div>',
                //controller: ''
            }
        };

        var admin = {
            'dashboard': {
                name: 'admin.dashboard',
                url: '/admin/dashboard',
                templateUrl: '../angular/admin/modules/dashboard/views/dashboard.html',
                //controller: 'AdminDashboardController as ctrl'
            },
            'product': {
                name: 'admin.product',
                url: '/admin/product',
                templateUrl: 'angular/templates/admin-product.html',
                controller: 'AdminProductListCtrl as ctrl'
            },
            'product-create': {
                name: 'admin.product.create',
                url: '/admin/product/create/:id',
                templateUrl: 'angular/templates/admin-add-product.html',
                controller: 'AdminProductAddCtrl as ctrl'
            },
            'access-management': {
                name: 'admin.access-management',
                url: '/admin/access-management',
                templateUrl: 'angular/templates/admin-access-management.html',
                controller: function ($rootScope, $scope, $timeout) {

                    $scope.templates = [
                        { name: 'function-type.html', url: 'angular/templates/admin-access-management-function-type.html' },
                        { name: 'function.html', url: 'angular/templates/admin-access-management-function.html' },
                        { name: 'role.html', url: 'angular/templates/admin-access-management-role.html' },
                        { name: 'organization.html', url: 'angular/templates/admin-access-management-organization.html' },
                        { name: 'user-login.html', url: 'angular/templates/admin-access-management-user-login.html' },
                        { name: 'application.html', url: 'angular/templates/admin-access-management-application.html' },
                    ];
                    $scope.template = $scope.templates[0];

                    $scope.loadContent = function (template) {
                        $timeout(function () {
                            $scope.template = template;
                        }, 100);
                    };
                }
            },
            'report': {
                name: 'admin.report',
                url: '/admin/report',
                templateUrl: '../angular/admin/modules/report/views/report.html'
                //controller: ''
            },
            'member': {
                name: 'admin.member',
                url: '/admin/member',
                templateUrl: '../angular/admin/modules/member/views/member.html',
                //controller: 'AdminMemberController as ctrl',
            },
            'setting': {
                name: 'admin.setting',
                url: '/admin/setting',
                template: '<div><div ui-view> Hello Setting </div></div>',
                //controller: ''
            }
        }

        angular.forEach(seller, function (value, key) {
            $stateProvider.state(key, value);
        });

        angular.forEach(admin, function (value, key) {
            $stateProvider.state(key, value);
        });

        $urlRouterProvider.otherwise('/admin/dashboard');

    }

    angular.module('kratosEcho').config(router);

    angular.module('kratosEcho').value('serviceUrl', 'http://localhost:2170/api');

    angular.module('kratosEcho').controller('RootController', function ($rootScope) {

        $rootScope.config = {
            appName: 'Kratos Echo'
        };

    });

})()