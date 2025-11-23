<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log');
error_reporting(E_ALL);

if (!isset($_SESSION['username'])) {
    die("You must be logged in to add items.");
}

$servername = "localhost";
$username = "linkrlul_OnlineThrifting";
$password = "MarketplaceDatabase1";
$dbname = "linkrlul_items";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_SESSION['username'];
    $item_name = $_POST['item_name'];
    $category = $_POST['category'];
    $color = $_POST['color'];
    $size = $_POST['size'];
    $material = $_POST['material'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $image = null; // Start with no image

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $imageName = basename($_FILES['image']['name']);
        $targetPath = 'uploads/' . $imageName;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
            $image = $imageName;
            file_put_contents("debug.log", "Uploaded image saved as $image\n", FILE_APPEND);
        } else {
            file_put_contents("debug.log", "Image upload failed — move_uploaded_file error\n", FILE_APPEND);
    }
}

    $stmt = $conn->prepare("INSERT INTO catelogItems (username, item_name, category, color, size, material, description, price, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssdss", $username, $item_name, $category, $color, $size, $material, $description, $price, $image);
    $stmt->execute();
    $stmt->close();
    $conn->close();

    // setting the values for the log-activity structure 
    $_POST['activity_type'] = 'Add Item';
    $_POST['details'] = $category ? "User added $category" : "User added an item";

    // logger
    include 'log-activity.php';
    
    header("Location: linku-catalog.html");

    // prevent further output
    exit();
}
?>

