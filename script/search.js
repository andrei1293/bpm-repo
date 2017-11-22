var app = angular.module("searchPage", []);
app.controller("searchPageController", function($scope) {
    var metadata = null;

    $.ajax({
        type : 'GET',
        url : 'http://localhost:8081/bpm-repo/api/metadata.php',
        dataType : 'json',
        success : function(data) {
            metadata = data;
        },
        async : false
    });

    $scope.processIndustry = metadata[1].industries;
    $scope.modelType = metadata[2].types;

    var models = null;

    $.ajax({
        type : 'GET',
        url : 'http://localhost:8081/bpm-repo/api/models.php',
        dataType : 'json',
        success : function(data) {
            models = data;
        },
        async : false
    });

    $scope.models = models;

    $scope.searchModel = function() {
        var results = null;

        $.ajax({
            type : 'GET',
            url : 'http://localhost:8081/bpm-repo/api/search.php',
            dataType : 'json',
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
