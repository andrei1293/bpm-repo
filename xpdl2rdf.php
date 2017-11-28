<?php
include 'api/db_connect.php';

$id = $_GET['modelId'];
$file = $_GET['modelFile'];

$result = shell_exec("XpdlToRdfTool.exe -f $file");
$metrics = explode(",", $result);
$event_id = round(microtime(true) * 1000);

$connection = open_connection();

$sql = "insert into event (Event_ID, Process_Model_ID, Activity_ID, Event_Timestamp)
    values ('$event_id', '$id', '1', CURRENT_TIMESTAMP())";
$connection->query($sql);

for ($i = 0; $i < count($metrics) - 1; $i++) {
    $metric_id = $i + 1;

    $sql = "insert into process_model_event_metric (Event_ID, Model_Metric_ID, Metric_Value)
        values ('$event_id', '$metric_id', '$metrics[$i]')";
    $connection->query($sql);
}

$connection->close();
?>
