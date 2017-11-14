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
            if ($('#parentProcessList').val() == 'none') isStoreFormValid = false;
        }

        if (!$('#modelFile').val()) isStoreFormValid = false;

        /*if (!$("#openModel").prop("checked") && !$("#grantAccess").prop("checked")) {
            isStoreFormValid = false;
        }*/

        if (isStoreFormValid) {
            $('#storeFormError').hide();
            $('#storeModelForm').hide();
            $('#storeFormSubmit').show();
            $('#afterStoring').show();

            var id = new Date().getTime();

            console.log(id);

            if ($("#newProcess").prop("checked")) {
                $.get('http://localhost:8081/api.bpm-repo/storeProcess.php',
                    {
                        'processId' : id,
                        'processName' : $('#processName').val(),
                        'parentProcess' : $('#parentProcessList').val(),
                        'processIndustry' : $('#processIndustry').val(),
                        'processSource' : $('#processSource').val(),
                        'processDescription' : $('#processDescription').val()
                    }
                );

                $.get('http://localhost:8081/api.bpm-repo/storeProcess.php',
                    {
                        'modelId' : id,
                        'relatedProcess' : id,
                        'modelType' : $('#modelType').val(),
                        'modelFile' : $('#modelFile').val(),
                        'modelReport' : $('#modelReport').val(),
                        'modelImage' : $('#modelImage').val()
                    }
                );
            } else {
                $.get('http://localhost:8081/api.bpm-repo/storeProcess.php',
                    {
                        'modelId' : id,
                        'relatedProcess' : $('#existingProcessList').val(),
                        'modelType' : $('#modelType').val(),
                        'modelFile' : $('#modelFile').val(),
                        'modelReport' : $('#modelReport').val(),
                        'modelImage' : $('#modelImage').val()
                    }
                );
            }
        } else {
            $('#storeFormError').show();
        }
    });

    $('#openModel').click(function() {
        $('#grantRolesSection').hide();
    });

    $('#grantAccess').click(function() {
        $('#grantRolesSection').show();
    });

    /*$('#addUserReadModel').click(function() {
        var userName = $('#grantUserField').val();
        var isValid = true;
        if (!userName) isValid = false;

        if (grantedUsers.indexOf(userName + '-r') == -1) {
            if (isValid) {
                $.get('https://api.github.com/search/users?q=' + userName, function(data) {
                    if (data.total_count == 1) {
                        $('#grantUserError').hide();
                        grantedUsers.push(userName + '-r');
                        $('#grantUsersList').append('<a class="btn btn-default btn-xs" onclick="var index = grantedUsers.indexOf(\'' +
                            userName + '-r\'); grantedUsers.splice(index, 1); this.parentNode.removeChild(this);">' +
                            userName + ' &#9747</a> ');
                        $('#grantUserField').val('');
                    } else {
                        $('#grantUserError').show();
                    }
                });
            } else {
                $('#grantUserError').show();
            }
        } else {
            $('#grantUserError').hide();
        }
    });

    $('#addUserWriteModel').click(function() {
        var userName = $('#grantUserField').val();
        var isValid = true;
        if (!userName) isValid = false;

        if (grantedUsers.indexOf(userName + '-w') == -1) {
            if (isValid) {
                $.get('https://api.github.com/search/users?q=' + userName, function(data) {
                    if (data.total_count == 1) {
                        $('#grantUserError').hide();
                        grantedUsers.push(userName + '-w');
                        $('#grantUsersList').append('<a class="btn btn-primary btn-xs" onclick="var index = grantedUsers.indexOf(\'' +
                            userName + '-w\'); grantedUsers.splice(index, 1); this.parentNode.removeChild(this);">' +
                            userName + ' &#9747</a> ');
                        $('#grantUserField').val('');
                    } else {
                        $('#grantUserError').show();
                    }
                });
            } else {
                $('#grantUserError').show();
            }
        } else {
            $('#grantUserError').hide();
        }
    });*/
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
