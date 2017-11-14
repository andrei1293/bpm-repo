var app = angular.module("mainPage", []);
app.controller("mainPageController", function($scope) {
    var response = null;

    $.ajax({
        type : 'GET',
        url : 'http://localhost:8081/api.bpm-repo/models.php',
        success : function(data) {
            response = data;
        },
        async : false
    });

    $scope.models = [
        {
            'processId' : '1',
            'processName' : 'Supply',
            'modelType' : 'BPMN',
            'modelFile' : 'supply.bpmn',
            'modelId' : '1'
        }
    ];
});
