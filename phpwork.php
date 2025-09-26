<?php
#connect to a database
$servername = "localhost";
$username = "root"; 
$password = "Hellowz12!.";
$dbname = "marketplace_db";    
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>
