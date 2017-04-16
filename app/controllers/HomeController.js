(function () {
    'use strict';

    angular
        .module('qrcodetomaps')
        .controller('HomeController', HomeController);

    HomeController.inject = [];

    function HomeController() {

        var vm = this;

        vm.gerar = _gerar;

        function _gerar(obj) {
            if(!obj) {
                alert('Texto obrigatório.');
                return;
            }

            vm.textValue = obj.texto;
            vm.img = obj.img;
            vm.maps = (obj.address ? true : false);
            vm.address = obj.address;
        }
    }
})();
