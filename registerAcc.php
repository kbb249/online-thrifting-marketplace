<?php
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

    //prepare and bind to the database 
    $stmt = $conn->prepare("INSERT INTO user_account (username, email, passwordhash) VALUES (?, ?, ?)");

    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }
    
    $stmt->bind_param("sss", $username, $email, $passwordhash);

    //execute the statement
    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    //close the statement
    $stmt->close();
}
//close the connection
$conn->close();
?>


