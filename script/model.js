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

            $.get('http://api.bpm-repo/updateModelImage.php',
                {
                    'modelId' : $_GET('modelId'),
                    'modelImage' : $('#modelImage').val()
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

            $.get('http://api.bpm-repo/updateModelFile.php',
                {
                    'modelId' : $_GET('modelId'),
                    'modelFile' : $('#modelFile').val()
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

            $.get('http://api.bpm-repo/updateModelReport.php',
                {
                    'modelId' : $_GET('modelId'),
                    'modelReport' : $('#modelReport').val()
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
        url : 'http://api.bpm-repo/model.php?modelId=' + $_GET('modelId'),
        success : function(data) {
            response = data;
        },
        async : false
    });

    $scope.modelImage = 'supply.png';
    $scope.processId = '1';
    $scope.processName = 'Supply';
    $scope.modelType = 'BPMN';
    $scope.modelFile = 'supply.bpmn';
    $scope.modelReport = 'supply_report.pdf';
    $scope.modelMetrics = {
        'tasks' : 7,
        'gateways' : 2,
        'start' : 1,
        'intermediate' : 2,
        'end' : 1,
        'shortcomings' : 2,
        'conformity' : 73
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
