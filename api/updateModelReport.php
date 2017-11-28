<?php
include 'db_connect.php';

$connection = open_connection();

$id = $_GET['modelId'];
$report = $_GET['modelReport'];

$sql = "update process_model set Process_Model_Report_URL = '$report'
    where Process_Model_ID = '$id'";

$connection->query($sql);
$connection->close();
?>
