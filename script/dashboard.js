google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawBarChart);
google.charts.setOnLoadCallback(drawLineChart);
google.charts.setOnLoadCallback(drawGauge);

function drawBarChart() {
    var analysisResult = null;

    $.ajax({
        type : 'GET',
        url : 'http://localhost:8081/bpm-repo/api/model.php?modelId=' + $_GET('modelId'),
        dataType : 'json',
        success : function(data) {
            analysisResult = data;
        },
        async : false
    });

    var response = { };
    response.modelMetrics = {
        'tasks' : parseInt(analysisResult[1].modelMetrics[0]),
        'gateways' : parseInt(analysisResult[1].modelMetrics[1]),
        'start' : parseInt(analysisResult[1].modelMetrics[2]),
        'intermediate' : parseInt(analysisResult[1].modelMetrics[3]),
        'end' : parseInt(analysisResult[1].modelMetrics[4])
    };

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
    var analysisResult = null;

    $.ajax({
        type : 'GET',
        url : 'http://localhost:8081/bpm-repo/api/model.php?modelId=' + $_GET('modelId'),
        dataType : 'json',
        success : function(data) {
            analysisResult = data;
        },
        async : false
    });

    var response = { };
    response.designShortcomings = analysisResult[2].designShortcomings;

    var table = [
        ['Timestamp', 'Design shortcomings']
    ];

    for (var x in response.designShortcomings) {
        table.push([response.designShortcomings[x].timestamp, parseInt(response.designShortcomings[x].shortcomings)]);
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
    var analysisResult = null;

    $.ajax({
        type : 'GET',
        url : 'http://localhost:8081/bpm-repo/api/model.php?modelId=' + $_GET('modelId'),
        dataType : 'json',
        success : function(data) {
            analysisResult = data;
        },
        async : false
    });

    var response = { };
    response.modelMetrics = {
        'conformity' : parseFloat(analysisResult[1].modelMetrics[6])
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
