google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawBarChart);
google.charts.setOnLoadCallback(drawLineChart);
google.charts.setOnLoadCallback(drawGauge);

function drawBarChart() {
    var response = { };

    $.ajax({
        type : 'GET',
        url : 'http://api.bpm-repo/model.php?modelId=' + $_GET('modelId'),
        success : function(data) {
            response = data;
        },
        async : false
    });

    response.modelMetrics = {
        'tasks' : 7,
        'gateways' : 2,
        'start' : 1,
        'intermediate' : 2,
        'end' : 1,
        'shortcomings' : 2,
        'conformity' : 73
    };

    console.log(response);

    var data = google.visualization.arrayToDataTable([
        ['Metric',              'Value', { role: 'style' }],
        ['Tasks / Subprocesses',    response.modelMetrics.tasks,      '#6699ff'],
        ['Gateways',                response.modelMetrics.gateways,      '#ff9900'],
        ['Start events',            response.modelMetrics.start,      '#33cc33'],
        ['Intermediate events',     response.modelMetrics.intermediate,      '#cc9900'],
        ['End events',              response.modelMetrics.end,      '#cc3300']
    ]);

    var view = new google.visualization.DataView(data);

    var options = {
        legend: { position: 'none' },
        chartArea: { width: '50%' }
    };

    var chart = new google.visualization.BarChart(document.getElementById('barchartMetrics'));
    chart.draw(view, options);
}

function drawLineChart() {
    var response = { };

    $.ajax({
        type : 'GET',
        url : 'http://api.bpm-repo/model.php?modelId=' + $_GET('modelId'),
        success : function(data) {
            response = data;
        },
        async : false
    });

    response.designShortcomings = [
        { 'timestamp' : '09-11-2017 11:23:44', 'shortcomings' : 2 },
        { 'timestamp' : '09-11-2017 11:55:14', 'shortcomings' : 3 },
        { 'timestamp' : '09-11-2017 14:03:38', 'shortcomings' : 1 },
        { 'timestamp' : '10-11-2017 10:05:12', 'shortcomings' : 0 },
        { 'timestamp' : '10-11-2017 12:25:01', 'shortcomings' : 2 }
    ];

    var table = [
        ['Timestamp', 'Design shortcomings']
    ];

    for (var x in response.designShortcomings) {
        table.push([response.designShortcomings[x].timestamp, response.designShortcomings[x].shortcomings]);
    }

    var data = google.visualization.arrayToDataTable(table);
    var options = {
        title: 'Design shortcomings',
        legend: { position: 'none' },
        chartArea: { width: '80%' },
        hAxis: { textColor: '#FFFFFF' },
        colors: ['#009933']
    };

    var chart = new google.visualization.LineChart(document.getElementById('linechartMetrics'));
    chart.draw(data, options);
}

function drawGauge() {
    var response = { };

    $.ajax({
        type : 'GET',
        url : 'http://api.bpm-repo/model.php?modelId=' + $_GET('modelId'),
        success : function(data) {
            response = data;
        },
        async : false
    });

    response.modelMetrics = {
        'tasks' : 7,
        'gateways' : 2,
        'start' : 1,
        'intermediate' : 2,
        'end' : 1,
        'shortcomings' : 2,
        'conformity' : 73
    };

    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['', response.modelMetrics.conformity]
    ]);

    var options = {
        width: 120, height: 120,
        redFrom: 0, redTo: 37,
        yellowFrom: 37, yellowTo: 80,
        greenFrom: 80, greenTo: 100,
        minorTicks: 10
    };

    var chart = new google.visualization.Gauge(document.getElementById('modelGauge'));
    chart.draw(data, options);
}
