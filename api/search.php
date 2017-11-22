<?php
include 'db_connect.php';

$process_name = $_GET['processName'];
$process_industry = $_GET['processIndustry'];
$process_source = $_GET['processSource'];
$model_type = $_GET['modelType'];

$connection = open_connection();

$models = array();
$sql = "select process_model.Process_ID, Process_Name, Process_Model_ID,
        Model_Type_Name, Process_Model_File_URL, Process_Industry_ID,
        Process_Source, process_model.Model_Type_ID
    from process_model, process, model_type
    where (process_model.Process_ID = process.Process_ID and
        process_model.Model_Type_ID = model_type.Model_Type_ID)";

if (isset($process_name)) {
    $sql = $sql . " and Process_Name like '%$process_name%'";
}

if (isset($process_industry)) {
    $sql = $sql . " and Process_Industry_ID like '%$process_industry%'";
}

if (isset($process_source)) {
    $sql = $sql . " and Process_Source like '%$process_source%'";
}

if (isset($model_type)) {
    $sql = $sql . " and process_model.Model_Type_ID like '%$model_type%'";
}

$result = $connection->query($sql);

while ($row = $result->fetch_assoc()) {
    array_push($models, array('processId' => $row['Process_ID'],
        'processName' => $row['Process_Name'],
        'modelType' => $row['Model_Type_Name'],
        'modelFile' => $row['Process_Model_File_URL'],
        'modelId' => $row['Process_Model_ID']));
}

echo json_encode($models);
$connection->close();
?>
