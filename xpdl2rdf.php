<?php
include 'api/db_connect.php';

$id = $_GET['modelId'];
$file = $_GET['modelFile'];

$result = shell_exec("XpdlToRdfTool.exe -f $file");
$metrics = explode(';', $result);
$event_id = round(microtime(true) * 1000);

$connection = open_connection();

$sql = "insert into event (Event_ID, Process_Model_ID, Activity_ID, Event_Timestamp)
    values ('$event_id', '$id', '1', CURRENT_TIMESTAMP())";
$connection->query($sql);

for ($i = 0; $i < count($metrics) - 2; $i++) {
    $metric_id = $i + 1;
    $value = round(str_replace(',', '.', $metrics[$i]), 2);

    echo $value . ' ';

    $sql = "insert into process_model_event_metric (Event_ID, Model_Metric_ID, Metric_Value)
        values ('$event_id', '$metric_id', '$value')";
    $connection->query($sql);
}

$csc = round(str_replace(',', '.', $metrics[6]), 2);
$min = -5 - round(str_replace(',', '.', $metrics[0]), 2);
$max = 0;
$csc_percent = 100 * ($csc - $min) / ($max - $min);

$sql = "insert into process_model_event_metric (Event_ID, Model_Metric_ID, Metric_Value)
    values ('$event_id', '7', '$csc_percent')";
$connection->query($sql);

$recommendations = explode('+', $metrics[7]);
$content = '[ "' . $recommendations[0] . '"';

for ($i = 1; $i < count($recommendations) - 1; $i++) {
    $content = $content . ', "' . $recommendations[$i] . '"';
}

file_put_contents("api/recommendations/$id", $content . " ]");

$connection->close();
?>
