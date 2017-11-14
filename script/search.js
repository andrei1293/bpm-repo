var app = angular.module("searchPage", []);
app.controller("searchPageController", function($scope) {
    var metadata = null;

    $.ajax({
        type : 'GET',
        url : 'http://localhost:8081/api.bpm-repo/metadata.php',
        success : function(data) {
            metadata = data;
        },
        async : false
    });

    $scope.processIndustry = [
        {
            'processIndustryId' : '1',
            'processIndustryName' : 'Supply chain'
        },
        {
            'processIndustryId' : '2',
            'processIndustryName' : 'Manufactory'
        }
    ];
    $scope.modelType = [
        {
            'modelTypeId' : '1',
            'modelTypeName' : 'BPMN'
        },
        {
            'modelTypeId' : '2',
            'modelTypeName' : 'IDEF0'
        }
    ];

    var models = null;

    $.ajax({
        type : 'GET',
        url : 'http://localhost:8081/api.bpm-repo/models.php',
        success : function(data) {
            models = data;
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

    $scope.searchModel = function() {
        var results = null;

        $.ajax({
            type : 'GET',
            url : 'http://api.bpm-repo/search.php',
            data: {
                'processName' : $('#processName').val(),
                'processIndustry' : $('#processIndustry').val(),
                'processSource' : $('#processSource').val(),
                'modelType' : $('#modelType').val()
            },
            success : function(data) {
                results = data;
            },
            async : false
        });

        $scope.models = results;
    };
});
