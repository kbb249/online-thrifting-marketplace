<?php
session_start();
ini_set('log_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli("localhost", "linkrlul_OnlineThrifting", "MarketplaceDatabase1", "linkrlul_items");
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $stmt = $conn->prepare("SELECT item_name, category, color, size, material, description, price FROM catelogItems WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    echo json_encode($result->fetch_assoc());
    $stmt->close();
}
$conn->close();
?>