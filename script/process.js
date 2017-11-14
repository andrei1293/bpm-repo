$(document).ready(function() {
    $('#updateParentProcessError').hide();
    $('#updateFormSubmit').hide();

    $('#updateParentProcessButton').click(function() {
        var isValid = true;

        if ($('#parentProcessList').val() === 'none') isValid = false;

        if (isValid) {
            $('#updateParentProcessError').hide();
            $('#processInfo').hide();
            $('#storedModelsList').hide();
            $('#updateFormSubmit').show();

            $.get('http://api.bpm-repo/updateParentProcess.php',
                {
                    'processId' : $_GET('processId'),
                    'parentProcess' : $('#parentProcessList').val()
                }
            );
        } else {
            $('#updateParentProcessError').show();
        }
    });
});

var app = angular.module("processPage", []);
app.controller("processPageController", function($scope) {
    var response = null;

    $.ajax({
        type : 'GET',
        url : 'http://api.bpm-repo/process.php?processId=' + $_GET('processId'),
        success : function(data) {
            response = data;
        },
        async : false
    });

    $scope.processName = 'Supply';
    $scope.parentProcessId = '1';
    $scope.parentProcessName = 'Source';
    $scope.processes = [
        {
            'processId' : 'none',
            'processName' : '---'
        },
        {
            'processId' : '1',
            'processName' : 'Make'
        },
        {
            'processId' : '2',
            'processName' : 'Deliver'
        }
    ];
    $scope.childProcesses = [
        {
            'processId' : '1',
            'processName' : 'Make'
        },
        {
            'processId' : '2',
            'processName' : 'Deliver'
        }
    ]
    $scope.models = [
        {
            'modelType' : 'BPMN',
            'modelFile' : 'supply.bpmn',
            'modelId' : '1'
        }
    ];
});
