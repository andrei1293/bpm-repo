<?php
include 'db_connect.php';

$connection = open_connection();

$id = $_GET['processId'];

$processInfo = array();
$sql = "select Process_Name,
        (select Parent_Process_ID from process_hierarchy where process_hierarchy.Process_ID = process.Process_ID) as Parent_Process_ID,
        (select Process_Name from process where process.Process_ID = Parent_Process_ID) as Parent_Process_Name,
        process_industry.Process_Industry_Name, Process_Source, Process_Description
    from process, process_industry
    where process.Process_Industry_ID = process_industry.Process_Industry_ID and
        process.Process_ID = '$id'";
$result = $connection->query($sql);
while ($row = $result->fetch_assoc()) {
    array_push($processInfo, array('processName' => $row['Process_Name'],
        'parentProcessId' => $row['Parent_Process_ID'],
        'parentProcessName' => $row['Parent_Process_Name'],
        'processIndustry' => $row['Process_Industry_Name'],
        'processSource' => $row['Process_Source'],
        'processDescription' => $row['Process_Description']));
}

$childProcesses = array();
$sql = "select process_hierarchy.Process_ID, process.Process_Name
    from process, process_hierarchy
    where process.Process_ID = process_hierarchy.Process_ID
        and process_hierarchy.Parent_Process_ID = '$id'";
$result = $connection->query($sql);
while ($row = $result->fetch_assoc()) {
    array_push($childProcesses, array('processId' => $row['Process_ID'],
        'processName' => $row['Process_Name']));
}

$models = array();
$sql = "select Model_Type_Name, Process_Model_File_URL, Process_Model_ID
    from process_model, model_type
    where process_model.Model_Type_ID = model_type.Model_Type_ID
        and Process_ID = '$id'";
$result = $connection->query($sql);
while ($row = $result->fetch_assoc()) {
    array_push($models, array('modelType' => $row['Model_Type_Name'],
        'modelFile' => $row['Process_Model_File_URL'],
        'modelId' => $row['Process_Model_ID']));
}

$response = array();
array_push($response, array('process' => $processInfo));
array_push($response, array('childProcesses' => $childProcesses));
array_push($response, array('models' => $models));

echo json_encode($response);
$connection->close();
?>
