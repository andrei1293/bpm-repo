<?php
include 'db_connect.php';

$connection = open_connection();

$id = $_GET['modelId'];
$process = $_GET['relatedProcess'];
$type = $_GET['modelType'];
$file = $_GET['modelFile'];
$report = $_GET['modelReport'];
$image = $_GET['modelImage'];

$sql = "insert into process_model (Process_Model_ID, Process_ID, Model_Type_ID,
    Process_Model_File_URL, Process_Model_Image_URL, Process_Model_Report_URL) values
    ('$id', '$process', '$type', '$file', '$image', '$report')";
$connection->query($sql);

$connection->close();

header('Location: http://localhost:8081/bpm-repo/xpdl2rdf.php');
?>
