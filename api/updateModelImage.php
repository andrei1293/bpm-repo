<?php
include 'db_connect.php';

$connection = open_connection();

$id = $_GET['modelId'];
$image = $_GET['modelImage'];

$sql = "update process_model set Process_Model_Image_URL = '$image'
    where Process_Model_ID = '$id'";

$connection->query($sql);
$connection->close();
?>
