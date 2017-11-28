<?php
include 'db_connect.php';

$connection = open_connection();

$id = $_GET['modelId'];

$modelInfo = array();

$sql = "select Process_Model_ID, process_model.Process_ID, Process_Name,
    Model_Type_Name, Process_Model_File_URL, Process_Model_Image_URL,
    Process_Model_Report_URL
        from process_model, model_type, process
    where process_model.Model_Type_ID = model_type.Model_Type_ID and
        process_model.Process_ID = process.Process_ID and
        Process_Model_ID = '$id'";
$result = $connection->query($sql);

while ($row = $result->fetch_assoc()) {
    array_push($modelInfo, array('modelImage' => $row['Process_Model_Image_URL'],
        'processId' => $row['Process_ID'],
        'processName' => $row['Process_Name'],
        'modelType' => $row['Model_Type_Name'],
        'modelFile' => $row['Process_Model_File_URL'],
        'modelReport' => $row['Process_Model_Report_URL']));
}

$modelMetrics = array();

$sql = "select Event_ID, Model_Metric_ID, Metric_Value
    from process_model_event_metric
    where Event_ID = (select Event_ID from event where Process_Model_ID = '$id' order by Event_Timestamp desc limit 1)
    order by Model_Metric_ID";
$result = $connection->query($sql);

while ($row = $result->fetch_assoc()) {
    array_push($modelMetrics, $row['Metric_Value']);
}

$designShortcomings = array();

$sql = "select process_model_event_metric.Event_ID, Model_Metric_ID, Metric_Value, Event_Timestamp
    from process_model_event_metric, event
    where event.Event_ID = process_model_event_metric.Event_ID and
        event.Process_Model_ID = '$id' and
        Model_Metric_ID = 6
    order by Event_Timestamp";
$result = $connection->query($sql);

while ($row = $result->fetch_assoc()) {
    array_push($designShortcomings, array('timestamp' => $row['Event_Timestamp'],
        'shortcomings' => $row['Metric_Value']));
}

$response = array();
array_push($response, array('modelInfo' => $modelInfo));
array_push($response, array('modelMetrics' => $modelMetrics));
array_push($response, array('designShortcomings' => $designShortcomings));

echo json_encode($response);
$connection->close();
?>
