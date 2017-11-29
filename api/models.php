<?php
include 'db_connect.php';

$connection = open_connection();

$models = array();
$sql = 'select process_model.Process_ID, Process_Name, Process_Model_ID,
        Model_Type_Name, Process_Model_File_URL,
        (select Event_Timestamp from event where Process_Model_ID =
            process_model.Process_Model_ID order by Event_Timestamp desc limit 1) as Event_Timestamp
    from process_model, process, model_type
    where process_model.Process_ID = process.Process_ID and
        process_model.Model_Type_ID = model_type.Model_Type_ID
    order by Event_Timestamp desc';

$result = $connection->query($sql);

while ($row = $result->fetch_assoc()) {
    array_push($models, array('processId' => $row['Process_ID'],
        'processName' => $row['Process_Name'],
        'modelType' => $row['Model_Type_Name'],
        'modelFile' => $row['Process_Model_File_URL'],
        'modelId' => $row['Process_Model_ID']));
}

echo json_encode($models);
$connection->close();
?>
