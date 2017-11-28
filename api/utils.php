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

function generate_hierarchy_level_markup($level) {
    $markup = '--';
    $result = '';

    for ($i = 0; $i < $level; $i++) {
        $result = $result . $markup;
    }

    return $result;
}

$industries = array();

function define_industry_hierarchy_level($parent_id, $level) {
    require_once 'db_connect.php';
    $connection = open_connection();

    global $industries;
    $level++;

    $sql = "select process_industry_hierarchy.Process_Industry_ID, Process_Industry_Name,
            Parent_Category_ID
        from process_industry_hierarchy, process_industry
        where process_industry_hierarchy.Process_Industry_ID = process_industry.Process_Industry_ID and
            Parent_Category_ID = $parent_id";
    $result = $connection->query($sql);

    while ($row = $result->fetch_assoc()) {
        $markup = generate_hierarchy_level_markup($level);
        array_push($industries, array('processIndustryId' => $row['Process_Industry_ID'],
            'processIndustryName' => $markup . ' ' . $row['Process_Industry_Name']));
        define_industry_hierarchy_level($row['Process_Industry_ID'], $level);
    }

    $connection->close();
}

define_industry_hierarchy_level(0, -1);
?>
