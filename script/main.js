var app = angular.module("mainPage", []);
app.controller("mainPageController", function($scope) {
    var response = null;

    $.ajax({
        type : 'GET',
        url : 'http://localhost:8081/bpm-repo/api/models.php',
        dataType : 'json',
        success : function(data) {
            response = data;
        },
        async : false
    });

    $scope.models = response;
});
