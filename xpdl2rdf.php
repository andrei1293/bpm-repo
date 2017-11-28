<?php
include 'api/db_connect.php';
include 'utils.php';

$id = $_GET['modelId'];
$file = $_GET['modelFile'];
$activity = $_GET['activity'];

$result = shell_exec("XpdlToRdfTool.exe -f $file");
$metrics = explode(';', $result);
$event_id = round(microtime(true) * 1000);

$connection = open_connection();

$sql = null;

if ($activity == 'store') {
    $sql = "insert into event (Event_ID, Process_Model_ID, Activity_ID, Event_Timestamp)
        values ('$event_id', '$id', '1', CURRENT_TIMESTAMP())";
}

if ($activity == 'update') {
    $sql = "insert into event (Event_ID, Process_Model_ID, Activity_ID, Event_Timestamp)
        values ('$event_id', '$id', '2', CURRENT_TIMESTAMP())";
}

$connection->query($sql);

for ($i = 0; $i < count($metrics) - 2; $i++) {
    $metric_id = $i + 1;
    $value = round(str_replace(',', '.', $metrics[$i]), 2);
    $sql = "insert into process_model_event_metric (Event_ID, Model_Metric_ID, Metric_Value)
        values ('$event_id', '$metric_id', '$value')";
    $connection->query($sql);
}

$csc_percent = calculate_csc_percent($metrics[6], $metrics[0]);

$sql = "insert into process_model_event_metric (Event_ID, Model_Metric_ID, Metric_Value)
    values ('$event_id', '7', '$csc_percent')";
$connection->query($sql);

save_model_recommendations($metrics[7], $id);

$connection->close();
?>
