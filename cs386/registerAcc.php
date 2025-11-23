<?php

ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log');
error_reporting(E_ALL);

//database connection variables
$servername = "localhost";
$username = "linkrlul_OnlineThrifting";
$password ="MarketplaceDatabase1";
$dbname = "linkrlul_userAccount";

//create connection
$conn = new mysqli($servername, $username, $password, $dbname);
//check connection  
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


//see if the form has been submitted 
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //get the form data
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    
    //password validation 
    if($password != $confirm_password){
        die("passwords do not match");
    }
    //hash the password 
    $passwordhash = password_hash($password, PASSWORD_DEFAULT);
    // check if username already exists
    $checkStmt = $conn->prepare("SELECT username FROM user_account WHERE username = ?");
    $checkStmt->bind_param("s", $username);
    $checkStmt->execute();
    $checkStmt->store_result();

    if ($checkStmt->num_rows > 0) {
        die("Error: Username already taken");
    }
    $checkStmt->close();

    //prepare and bind to the database 
    $stmt = $conn->prepare("INSERT INTO user_account (username, email, passwordhash) VALUES (?, ?, ?)");
    
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }
    
    $stmt->bind_param("sss", $username, $email, $passwordhash);

    //execute the statement
    if ($stmt->execute()) {
        header("Location: index.php");
        exit();
    } 
    else{
        if (strpos($stmt->error, 'Duplicate entry') !== false) {
        echo "Error: Username already exists.";
    } else {
        echo "Database error: " . $stmt->error;
    }
    }

    //close the statement
    $stmt->close();
}
//close the connection
$conn->close();
?>

