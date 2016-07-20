angular.module("umbraco")
.controller("FreshKeyValuePair.EditorController", function ($scope) {
    if(!$scope.model.value){
        $scope.model.value = {items:[]}
    }
    $scope.add = function () {
        $scope.model.value.items.push({
            key: $scope.model.config.autoGenerateKey ? guid() : '',
            value: ''
        });
    };

    $scope.delete = function (listValue) {
        if (confirm("Are you sure you want to delete this value from the list?")) {
            var index = $scope.model.value.items.indexOf(listValue);
            $scope.model.value.items.splice(index, 1);
        }
    }

    $scope.validateKey = function (validateItem, viewValue) {
        var matchingKeys = _.any($scope.model.value.items, function (item) {
            
            return item.key === viewValue && item.$$hashKey != validateItem.$$hashKey;
        });
        return !matchingKeys;
    }

    var guid = (function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                       .toString(16)
                       .substring(1);
        }
        return function () {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                   s4() + '-' + s4() + s4() + s4();
        };
    })();

});