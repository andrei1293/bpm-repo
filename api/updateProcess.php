<?php
include 'db_connect.php';

$connection = open_connection();

$id = $_GET['processId'];
$parent = $_GET['parentProcess'];
$mode = $_GET['mode'];

$sql = NULL;

if ($mode == 'setParent') {
    $sql = "insert into process_hierarchy (Process_ID, Parent_Process_ID)
        values ('$id', '$parent')";
}

if ($mode == 'updateParent') {
    $sql = "update process_hierarchy set Parent_Process_ID = '$parent'
        where Process_ID = '$id'";
}

if ($mode == 'removeParent') {
    $sql = "delete from process_hierarchy where Process_ID = '$id'";
}

$connection->query($sql);
$connection->close();
?>
