$(document).ready(function() {
    $('#authError').hide();
    $('#authWarning').hide();

    $('#authButton').click(function() {
        var userName = $('#userName').val();

        if (userName) {
            $.get('https://api.github.com/search/users?q=' + userName, function(data) {
                if (data.total_count == 1) {
                    $('#authError').hide();
                    window.location.href = 'main.html';
                } else {
                    $('#authWarning').show();
                    $('#authError').hide();
                }
            });
        } else {
            $('#authError').show();
        }
    });
});
