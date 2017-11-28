<?php
include 'db_connect.php';
include 'utils.php';

$connection = open_connection();

$processes = array();
array_push($processes, array('processId' => 'none', 'processName' => '--- Select process ---'));
$sql = 'select Process_ID, Process_Name from process';
$result = $connection->query($sql);
while ($row = $result->fetch_assoc()) {
    array_push($processes, array('processId' => $row['Process_ID'], 'processName' => $row['Process_Name']));
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
