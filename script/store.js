$(document).ready(function() {
    $('#existingProcessSection').hide();
    $('#newProcessSection').hide();
    $('#storeFormError').hide();
    $('#storeFormSubmit').hide();
    $('#afterStoring').hide();
    $('#grantUserError').hide();
    $('#grantRolesSection').hide();

    $('#newProcess').click(function() {
        $('#existingProcessSection').hide();
        $('#newProcessSection').show();
    });

    $('#existingProcess').click(function() {
        $('#existingProcessSection').show();
        $('#newProcessSection').hide();
    });

    $('#storeModelButton').click(function() {
        var isStoreFormValid = true;

        if (!$("#newProcess").prop("checked") && !$("#existingProcess").prop("checked")) {
            isStoreFormValid = false;
        }

        if ($("#newProcess").prop("checked")) {
            if (!$('#processName').val()) isStoreFormValid = false;
            if (!$('#processSource').val()) isStoreFormValid = false;
        } else {
            if ($('#existingProcessList').val() == 'none') isStoreFormValid = false;
        }

        if (!$('#modelFile').val()) isStoreFormValid = false;
        if (!$('#modelReport').val()) isStoreFormValid = false;
        if (!$('#modelImage').val()) isStoreFormValid = false;

        if (isStoreFormValid) {
            $('#storeFormError').hide();
            $('#storeModelForm').hide();
            $('#storeFormSubmit').show();
            $('#afterStoring').show();

            var id = new Date().getTime();

            if ($("#newProcess").prop("checked")) {
                $.get('http://localhost:8081/bpm-repo/api/storeProcess.php',
                    {
                        'processId' : id,
                        'processName' : $('#processName').val(),
                        'parentProcess' : $('#parentProcessList').val(),
                        'processIndustry' : $('#processIndustry').val(),
                        'processSource' : $('#processSource').val(),
                        'processDescription' : $('#processDescription').val()
                    }
                );

                $.get('http://localhost:8081/bpm-repo/api/storeModel.php',
                    {
                        'modelId' : id,
                        'relatedProcess' : id,
                        'modelType' : $('#modelType').val(),
                        'modelFile' : document.getElementById("modelFile").files[0].name,
                        'modelReport' : document.getElementById("modelReport").files[0].name,
                        'modelImage' : document.getElementById("modelImage").files[0].name
                    }
                );
            } else {
                $.get('http://localhost:8081/bpm-repo/api/storeModel.php',
                    {
                        'modelId' : id,
                        'relatedProcess' : $('#existingProcessList').val(),
                        'modelType' : $('#modelType').val(),
                        'modelFile' : document.getElementById("modelFile").files[0].name,
                        'modelReport' : document.getElementById("modelReport").files[0].name,
                        'modelImage' : document.getElementById("modelImage").files[0].name
                    }
                );
            }
        } else {
            $('#storeFormError').show();
        }
    });
});

var app = angular.module("storePage", []);
app.controller("storePageController", function($scope) {
    var response = null;

    $.ajax({
        type : 'GET',
        url : 'http://localhost:8081/bpm-repo/api/metadata.php',
        dataType : 'json',
        success : function(data) {
            response = data;
        },
        async : false
    });

    $scope.processes = response[0].processes;
    $scope.processIndustry = response[1].industries;
    $scope.modelType = response[2].types;
});
