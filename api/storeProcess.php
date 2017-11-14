<?php
include 'db_connect.php';

$connection = open_connection();

$id = $_GET['processId'];
$name = $_GET['processName'];
$parent = $_GET['parentProcess'];
$industry = $_GET['processIndustry'];
$source = $_GET['processSource'];
$description = $_GET['processDescription'];

$sql = "insert into process (Process_ID, Process_Name, Process_Industry_ID, Process_Source,
    Process_Description) values ('$id', '$name', '$industry', '$source', '$description')";
$connection->query($sql);

if ($parent != 'none') {
    $sql = "insert into process_hierarchy (Process_ID, Parent_Process_ID)
        values ('$id', '$parent')";
    $connection->query($sql);
}

$connection->close();
?>
