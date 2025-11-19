<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//database connection variables
$servername = "localhost";
$username = "linkrlul_OnlineThrifting";
$password ="MarketplaceDatabase1";
$dbname = "linkrlul_userAccount";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    // Prepare SQL statement
    $stmt = $conn->prepare("SELECT passwordhash FROM user_account WHERE username = ?");
    $stmt->bind_param("s", $username);

    // Execute and fetch result
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($hashedPassword);
        $stmt->fetch();

        // Verify password
        if (password_verify($password, $hashedPassword)) {
            $_SESSION['username'] = $username;
            $stmt->close();
            $conn->close();
            header("Location: linku-catalog.html");
            exit();
        } else {
            echo "Incorrect password.";
        }
    } else {
        echo "Username not found.";
    }

    $stmt->close();
}

$conn->close();
?>
