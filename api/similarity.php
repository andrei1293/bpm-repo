<?php
$id = $_GET['modelId'];
echo file_get_contents("http://localhost:8082/semantic-bpm-repo/api/similarity?modelId=$id");
?>
