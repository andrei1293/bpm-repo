<?php
include 'db_connect.php';

$connection = open_connection();

$processes = array();
array_push($processes, array('processId' => 'none', 'processName' => '---'));
$sql = 'select Process_ID, Process_Name from process';
$result = $connection->query($sql);
while ($row = $result->fetch_assoc()) {
    array_push($processes, array('processId' => $row['Process_ID'], 'processName' => $row['Process_Name']));
}

$industries = array();
$sql = 'select Process_Industry_ID, Process_Industry_Name from process_industry';
$result = $connection->query($sql);
while ($row = $result->fetch_assoc()) {
    array_push($industries, array('processIndustryId' => $row['Process_Industry_ID'],
        'processIndustryName' => $row['Process_Industry_Name']));
}

$types = array();
$sql = 'select Model_Type_ID, Model_Type_Name from model_type';
$result = $connection->query($sql);
while ($row = $result->fetch_assoc()) {
    array_push($types, array('modelTypeId' => $row['Model_Type_ID'],
        'modelTypeName' => $row['Model_Type_Name']));
}

$response = array();
array_push($response, array('processes' => $processes));
array_push($response, array('industries' => $industries));
array_push($response, array('types' => $types));

echo json_encode($response);
$connection->close();
?>
