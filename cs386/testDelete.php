<?php
session_start();
require 'testListingFunctions.php';
createTestUserSession();

$conn = getTestConnection();
$conn->query("INSERT INTO catelogItems (username, item_name, category, color, size, material, description, price, image)
VALUES ('testuser', 'Delete Me', 'Shoes', 'White', 'S', 'Polyester', 'To be deleted', 15.00, 'default.jpg')");
$id = $conn->insert_id;

$_POST = ['id' => $id];

ob_start();
include '../deleteItem.php';

$conn = new mysqli('localhost', 'linkrlul_OnlineThrifting', 'MarketplaceDatabase1"', 'linkrlul_items');
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

$result = $conn->query("SELECT * FROM catelogItems WHERE id = 1");
assert($result->num_rows === 0, "Delete item failed");

echo "Item successfully deleted\n"; 
$conn->close();
?>
