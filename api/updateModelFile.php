<?php
include 'db_connect.php';

$connection = open_connection();

$id = $_GET['modelId'];
$file = $_GET['modelFile'];

$sql = "update process_model set Process_Model_File_URL = '$file'
    where Process_Model_ID = '$id'";

$connection->query($sql);
$connection->close();

header("Location: http://localhost:8081/bpm-repo/xpdl2rdf.php?modelId=$id&modelFile=$file");
?>
