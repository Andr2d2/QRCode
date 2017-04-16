(function () {
    'use strict';


    angular
        .module('qrcode', [])
        .component('qrcode', qrcodeConfig());

    function qrcodeConfig() {
        return {
            templateUrl: 'app/components/qrcode/qrcode.template.html',
            controller: QrcodeController,
            bindings: {
                text: '<',
                size: '<',
                middleIcon: '<',
                adress:'<',
                maps:'<'
            }
        }
    };

    QrcodeController.inject = [];

    function QrcodeController() {

        var vm = this;
        var qrcodeArea;

        vm.$onInit = _onInit;
        vm.$onChanges = _onChanges;
        vm.$onDestory = _onDestory;

        function _onInit() {            
            //_generate();
        };

        function _onChanges(obj) {
            if((obj.text.currentValue != obj.text.previousValue) && obj.text.currentValue)
                _generate();
        };

        function _onDestory() {
            qrcodeArea.clear();
        }

        function _generate() {
            qrcodeArea = document.getElementById('qrcode');

            if (vm.middleIcon) {
                var middleImg = document.createElement('img');
                middleImg.setAttribute('src', vm.middleIcon);
                middleImg.setAttribute('alt', 'icon');
                middleImg.setAttribute('class', 'qrcode-middle-img');

                qrcodeArea.appendChild(middleImg);
            }

            if (!vm.text && !vm.maps) {
                throw ('qrcode - text binding undefined');
            }
            
            if(vm.maps && vm.adress){
                var concatAdress = vm.adress.replace(' ', '+');
                vm.text = 'https://www.google.com/maps/dir/Current+Location/' + concatAdress;
            } else {
                throw('qrcode - for address, insert address and maps true binding');
            }

            var config = {
                text: vm.text,
                //colorDark: "#000000",
                //colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            }

            if (vm.size) config.height = config.width = vm.size;

            new QRCode(qrcodeArea, config);
        }
    }
})();
