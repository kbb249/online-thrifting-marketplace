<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

file_put_contents("debug.log", "editItem.php hit\n", FILE_APPEND);

// Log uncaught exceptions
set_exception_handler(function($e) {
    error_log("Unhandled exception: " . $e->getMessage());
    file_put_contents("debug.log", "Exception: " . $e->getMessage() . "\n", FILE_APPEND);
});

// Enable error logging and display for debugging
ini_set('log_errors', 1);
ini_set('display_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log');
error_reporting(E_ALL);

// Require login
if (!isset($_SESSION['username'])) {
    file_put_contents("debug.log", "Unauthorized access\n", FILE_APPEND);
    die("unauthorized access.");
}

// DB connection
$servername = "localhost";
$username = "linkrlul_OnlineThrifting";
$password = "MarketplaceDatabase1";
$dbname = "linkrlul_items";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    file_put_contents("debug.log", "DB connection failed: " . $conn->connect_error . "\n", FILE_APPEND);
    die("Connection failed: " . $conn->connect_error);
}

// Handle update
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
    file_put_contents("debug.log", "Processing update for ID: " . $_POST['id'] . "\n", FILE_APPEND);

    $id = intval($_POST['id']);
    $username = $_SESSION['username'];

    $item_name = $_POST['item_name'] ?? '';
    $category = $_POST['category'] ?? '';
    $color = $_POST['color'] ?? '';
    $size = $_POST['size'] ?? '';
    $material = $_POST['material'] ?? '';
    $description = $_POST['description'] ?? '';
    $price = $_POST['price'] ?? 0;
    $image = null;

    // Handle image upload
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $image = basename($_FILES['image']['name']);
        move_uploaded_file($_FILES['image']['tmp_name'], 'uploads/' . $image);
        file_put_contents("debug.log", "Image uploaded: $image\n", FILE_APPEND);
    }

    // Build SQL
    $sql = "UPDATE catelogItems SET item_name=?, category=?, color=?, size=?, material=?, description=?, price=?";
    $types = "ssssssd";
    $params = [$item_name, $category, $color, $size, $material, $description, $price];

    if ($image) {
        $sql .= ", image=?";
        $types .= "s";
        $params[] = $image;
    }

    $sql .= " WHERE id=? AND username=?";
    $types .= "is";
    $params[] = $id;
    $params[] = $username;

    // Execute update
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param($types, ...$params);
        $stmt->execute();
        $stmt->close();

        file_put_contents("debug.log", "Item ID $id updated successfully by $username\n", FILE_APPEND);


        $_POST['activity_type'] = 'Edit Item';
        $_POST['details'] = "User updated item ID $id";
        include 'log-activity.php';
        http_response_code(200); //success code 
        exit();


    } else {
        file_put_contents("debug.log", "Prepare failed: " . $conn->error . "\n", FILE_APPEND);
        error_log("Failed to prepare statement: " . $conn->error);
        http_response_code(500);
        echo "Failed to update item.";
    }
} else {
    file_put_contents("debug.log", "No POST or missing ID\n", FILE_APPEND);
    echo "No update triggered.";
}

// Safe connection close
if ($conn && $conn->ping()) {
    $conn->close();
}
?>

