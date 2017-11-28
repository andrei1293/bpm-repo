<?php
function calculate_csc_percent($csc_metric, $tasks_amount) {
    $csc = round(str_replace(',', '.', $csc_metric), 2);
    $min = -5 - round(str_replace(',', '.', $tasks_amount), 2);
    return 100 * ($csc - $min) / (0 - $min);
}

function save_model_recommendations($recommendations_list, $id) {
    $recommendations = explode('+', $recommendations_list);
    $content = '[ "' . $recommendations[0] . '"';

    for ($i = 1; $i < count($recommendations) - 1; $i++) {
        $content = $content . ', "' . $recommendations[$i] . '"';
    }

    file_put_contents("api/recommendations/$id", $content . " ]");
}
?>
