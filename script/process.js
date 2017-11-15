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

            $.get('http://localhost:8081/bpm-repo/api/updateProcess.php',
                {
                    'processId' : $_GET('processId'),
                    'parentProcess' : $('#parentProcessList').val(),
                    'mode' : 'updateParent'
                }
            );
        } else {
            $('#updateParentProcessError').show();
        }
    });

    $('#setParentProcessButton').click(function() {
        var isValid = true;

        if ($('#parentProcessList').val() === 'none') isValid = false;

        if (isValid) {
            $('#updateParentProcessError').hide();
            $('#processInfo').hide();
            $('#storedModelsList').hide();
            $('#updateFormSubmit').show();

            $.get('http://localhost:8081/bpm-repo/api/updateProcess.php',
                {
                    'processId' : $_GET('processId'),
                    'parentProcess' : $('#parentProcessList').val(),
                    'mode' : 'setParent'
                }
            );
        } else {
            $('#updateParentProcessError').show();
        }
    });

    $('#removeParentProcess').click(function() {
        $('#updateParentProcessError').hide();
        $('#processInfo').hide();
        $('#storedModelsList').hide();
        $('#updateFormSubmit').show();

        $.get('http://localhost:8081/bpm-repo/api/updateProcess.php',
            {
                'processId' : $_GET('processId'),
                'parentProcess' : $('#parentProcessList').val(),
                'mode' : 'removeParent'
            }
        );
    });
});

var app = angular.module("processPage", []);
app.controller("processPageController", function($scope) {
    var response = null;

    $.ajax({
        type : 'GET',
        url : 'http://localhost:8081/bpm-repo/api/process.php?processId=' + $_GET('processId'),
        dataType : 'json',
        success : function(data) {
            response = data;
        },
        async : false
    });

    $scope.processName = response[0].process[0].processName;
    $scope.parentProcessId = response[0].process[0].parentProcessId;
    $scope.parentProcessName = response[0].process[0].parentProcessName;
    $scope.processIndustry = response[0].process[0].processIndustry;
    $scope.processSource = response[0].process[0].processSource;
    $scope.processDescription = response[0].process[0].processDescription;

    $scope.childProcesses = response[1].childProcesses;
    $scope.models = response[2].models;

    if ($scope.childProcesses.length == 0) {
        $('#childProcessesList').hide();
    }

    if ($scope.parentProcessId == null) {
        $('#parentProcessSection').hide();
        $('#updateParentProcessButton').hide();
        $('#setParentProcessButton').show();
        $('#removeParentProcess').hide();
    } else {
        $('#parentProcessSection').show();
        $('#updateParentProcessButton').show();
        $('#setParentProcessButton').hide();
        $('#removeParentProcess').show();
    }

    var processesResponse = null;

    $.ajax({
        type : 'GET',
        url : 'http://localhost:8081/bpm-repo/api/metadata.php',
        dataType : 'json',
        success : function(data) {
            processesResponse = data;
        },
        async : false
    });

    $scope.processes = processesResponse[0].processes;

    for (var x in $scope.processes) {
        if ($scope.processes[x].processId == $_GET('processId')) {
            $scope.processes.splice(x, 1);
        }
    }
});
