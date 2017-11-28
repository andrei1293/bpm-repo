$(document).ready(function() {
    $('#updateFormSubmit').hide();
    $('#afterUpdate').hide();
    $('#updateModelImageError').hide();
    $('#updateModelFileError').hide();
    $('#updateModelReportError').hide();

    $('#updateModelImageButton').click(function() {
        var isValid = true;

        if (!$('#modelImage').val()) isValid = false;

        if (isValid) {
            $('#updateModelImageError').hide();
            $('#modelInfoSection').hide();
            $('#storedModelsList').hide();
            $('#updateFormSubmit').show();
            $('#afterUpdate').show();

            $.get('http://localhost:8081/bpm-repo/api/updateModelImage.php',
                {
                    'modelId' : $_GET('modelId'),
                    'modelImage' : document.getElementById("modelImage").files[0].name
                }
            );
        } else {
            $('#updateModelImageError').show();
        }
    });

    $('#updateModelFileButton').click(function() {
        var isValid = true;

        if (!$('#modelFile').val()) isValid = false;

        if (isValid) {
            $('#updateModelFileError').hide();
            $('#modelInfoSection').hide();
            $('#storedModelsList').hide();
            $('#updateFormSubmit').show();
            $('#afterUpdate').show();

            $.get('http://localhost:8081/bpm-repo/api/updateModelFile.php',
                {
                    'modelId' : $_GET('modelId'),
                    'modelFile' : document.getElementById("modelFile").files[0].name
                }
            );
        } else {
            $('#updateModelFileError').show();
        }
    });

    $('#updateModelReportButton').click(function() {
        var isValid = true;

        if (!$('#modelReport').val()) isValid = false;

        if (isValid) {
            $('#updateModelReportError').hide();
            $('#modelInfoSection').hide();
            $('#storedModelsList').hide();
            $('#updateFormSubmit').show();
            $('#afterUpdate').show();

            $.get('http://localhost:8081/bpm-repo/api/updateModelReport.php',
                {
                    'modelId' : $_GET('modelId'),
                    'modelReport' : document.getElementById("modelReport").files[0].name
                }
            );
        } else {
            $('#updateModelReportError').show();
        }
    });
});

var app = angular.module("modelPage", []);
app.controller("modelPageController", function($scope) {
    var response = null;

    $.ajax({
        type : 'GET',
        url : 'http://localhost:8081/bpm-repo/api/model.php?modelId=' + $_GET('modelId'),
        dataType : 'json',
        success : function(data) {
            response = data;
        },
        async : false
    });

    $scope.modelImage = response[0].modelInfo[0].modelImage;
    $scope.processId = response[0].modelInfo[0].processId;
    $scope.processName = response[0].modelInfo[0].processName;
    $scope.modelType = response[0].modelInfo[0].modelType;
    $scope.modelFile = response[0].modelInfo[0].modelFile;
    $scope.modelReport = response[0].modelInfo[0].modelReport;
    $scope.modelMetrics = {
        'tasks' : response[1].modelMetrics[0],
        'gateways' : response[1].modelMetrics[1],
        'start' : response[1].modelMetrics[2],
        'intermediate' : response[1].modelMetrics[3],
        'end' : response[1].modelMetrics[4],
        'shortcomings' : response[1].modelMetrics[5],
        'conformity' : response[1].modelMetrics[6]
    };
    $scope.modelEnhancement = [
        'Task "Example" disconnected from the rest of the process "Example"',
        'Intermediate event "Example" excluded from the process "Example" flow'
    ];
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
