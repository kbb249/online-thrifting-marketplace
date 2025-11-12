<?php
session_start();

// Redirect if not logged in
if (!isset($_SESSION['username'])) {
    header("Location: linku-login.html");
    exit();
}

// Database connection
$servername = "localhost";
$username = "linkrlul_OnlineThrifting";
$password ="MarketplaceDatabase1";
$dbname = "linkrlul_userAccount";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get username from session
$currentUser = $_SESSION['username'];

// Fetch user info
$stmt = $conn->prepare("SELECT username FROM userAccounts WHERE username = ?");
$stmt->bind_param("s", $currentUser);
$stmt->execute();
$stmt->bind_result($fetchedUsername);
$stmt->fetch();
$stmt->close();
$conn->close();
?>
