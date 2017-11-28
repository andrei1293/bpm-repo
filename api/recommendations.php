<?php
$id = $_GET['modelId'];
echo file_get_contents("recommendations/$id");
?>
