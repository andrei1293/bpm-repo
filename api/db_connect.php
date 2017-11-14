<?php
function open_connection() {
    $host = 'localhost';
    $user = 'root';
    $password = 'root';
    $database = 'bpm-repo';

    $connection = new mysqli($host, $user, $password, $database);

    if ($connection->connect_error)
    {
        die('Connection failed: ' . $connection->connect_error);
        return null;
    }

    return $connection;
}
?>
