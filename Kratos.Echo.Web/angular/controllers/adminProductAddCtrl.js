(function () {

    'use-strict'

    var AdminProductAddCtrl = function ($uibModal, adminProductService) {
        
        var vm = this;

        // template url for dropdown select product type
        this.template = {
            'information': {
                url: '../angular/admin/modules/product/views/form-information.html'
            },
            'voucher1': {
                url: '../angular/admin/modules/product/views/form-voucher1.html'
            },
            'voucher2': {
                url: '../angular/admin/modules/product/views/form-voucher2.html'
            },
            'birthday1': {
                url: '../angular/admin/modules/product/views/form-birthday1.html'
            },
            'birthday2': {
                url: '../angular/admin/modules/product/views/form-birthday2.html'
            }
        };

        // object for add new product
        this.formData           = {};
        this.attachData         = {};
        this.imageList          = [];
        this.srcPreviews        = [];
        this.productType        = 'Information';
        this.privilegeList      = ['Public', 'Member', 'VIP'];
        this.privilegeSelected  = [];

        // current template(default)
        this.currentTemplate = this.template.information;

        // when select product type will template change
        this.productTypeChanged = function (type) {
            switch (type) {
                case 'Information': vm.currentTemplate  = vm.template.information; break;
                case 'Voucher1': vm.currentTemplate     = vm.template.voucher1; break;
                case 'Voucher2': vm.currentTemplate     = vm.template.voucher2; break;
                case 'Birthday1': vm.currentTemplate    = vm.template.voucher2; break;
                case 'Birthday2': vm.currentTemplate    = vm.template.voucher2; break;
            }
        };

        // add privilege to list
        this.addPrivilege = function (privilege) {
            console.log(privilege)
            if (vm.privilegeSelected.length == 0) {
                vm.privilegeSelected.push(privilege);
            }

            var isDuplicate = false;

            angular.forEach(vm.privilegeSelected, function (p) {
                if (privilege == p) {
                    isDuplicate = true;
                }
            });

            if (!isDuplicate) {
                vm.privilegeSelected.push(privilege);
            }
        };

        // add image colletion
        this.addImageCollection = function () {

            $uibModal.open({
                templateUrl: 'angular/admin/modules/product/views/add-image-collection-modal.html',
                size: 'lg',
                backdrop: 'static',
                controller: function ($scope, $uibModalInstance) {

                    $scope.fileList = [];

                    //listen for the file selected event
                    $scope.$on("fileSelected", function (event, args) {
                        $scope.$apply(function () {
                            //add the file object to the scope's files collection
                            $scope.fileList.push(args.file);
                        });
                    });

                    $scope.ok = function () {
                        $uibModalInstance.close($scope.fileList);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                }
            })
            .result.then(function (data) {

                vm.imageList = data;

                angular.forEach(data, function (file) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        //console.log(e.target.result)
                        vm.srcPreviews.push(e.target.result);
                    };
                    reader.readAsDataURL(file);
                    
                });

            });
        };

        // Save Changes
        this.saveChanges = function () {
            
            if (vm.productType == 'Information') {
                vm.formData.Infomation = vm.attachData;
            }
            else if (vm.productType == 'Voucher1') {
                var Voucher = {
                    //Reward: {
                    //    Code: "Code6551134",
                    //    Name: "Reward Item Code6551134",
                    //    Effective: new Date(2016, 01, 01),
                    //    Expire: new Date(2016, 12, 31, 23, 59, 59),
                    //    Volume: 100
                    //},
                    Discount: {
                        Code: "Code6551135",
                        Name: "Reward Item Code6551135",
                        Effective: new Date(2016, 01, 01),
                        Expire: new Date(2016, 12, 31, 23, 59, 59),
                        Bath: 110.00
                    }
                };

                vm.formData.Name = "Test Point Reward";
                vm.formData.Description = "Test Description";
                vm.formData.Privilege = ["Public", "Member", "VIP"];
                vm.formData.Start_Notice = new Date(2016, 01, 01);
                vm.formData.End_Notice = new Date(2016, 12, 31, 23, 59, 59);

                vm.formData.Voucher = Voucher;
            }

            //vm.formData.Privilege = vm.privilegeSelected;
            vm.formData.Locations = [{ Id: 3, Lat: 100.4343, Lon: 11.2323, Name: 'test location'}];
            
            console.log(vm.formData)

            adminProductService.create(vm.formData, vm.imageList)
            .success(function (res) {
                console.log(res)
            })
            .error(function (error, msg) {

            });
        };

    };

    // inject
    angular.module('kratosEcho.product')
    .controller('AdminProductAddCtrl', AdminProductAddCtrl);

})()