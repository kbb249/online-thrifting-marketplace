<?php

session_start();
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log'); // logs to a file in the same folder
error_reporting(E_ALL);

<?php
// Database connection
$servername = "localhost";
$username = "linkrlul_OnlineThrifting";
$password = "MarketplaceDatabase1";
$dbname = "linkrlul_userActivity";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from POST or session
$username = $_POST['username'] ?? $_SESSION['username'] ?? 'guest_user';
$activity_type = $_POST['activity_type'] ?? 'Unknown';
$details = $_POST['details'] ?? 'No details provided';
$timestamp = date('Y-m-d H:i:s');

///INSERT UR SHIT HERE

$stmt->close();
$conn->close();
?>
