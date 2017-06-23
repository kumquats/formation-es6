<?php
// CORS enabled : cf. https://enable-cors.org/server_php.html
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$temperature = $_GET['temperature'];

echo json_encode(['temperature' => $temperature - 273.15]);


?>