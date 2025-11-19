<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log');
error_reporting(E_ALL);

if (!isset($_SESSION['username'])) {
    die("unauthorized access.");
}

$servername = "localhost";
$username = "linkrlul_OnlineThrifting";
$password = "MarketplaceDatabase1";
$dbname = "linkrlul_items";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['id'])) {
    $id = intval($_POST['id']);
    $username = $_SESSION['username'];

    $stmt = $conn->prepare("DELETE FROM catelogItems WHERE id = ? AND username = ?");
    $stmt->bind_param("is", $id, $username);
    $stmt->execute();
    $stmt->close();

    $_POST['activity_type'] = 'Delete Item';
    $_POST['details'] = "User deleted item ID $id";
    include 'log-activity.php';
}
$conn->close();
?>

