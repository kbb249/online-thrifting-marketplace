<?php
//database connection variables
$servername = "localhost";
$username = "OnlineThrifting";
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
    $username = $_POST['username'];
    $school = $_POST['school'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    //hash the password 
    $passwordhashed = password_hash($password, PASSWORD_DEFAULT);

    //prepare and bind to the database 
    $stmt = $conn->prepare("INSERT INTO userAccounts (username, school, email, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $username, $school, $email, $passwordhashed);
    $stmt->bind_param($param_types, $username, $school, $email, $passwordhashed);
    


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

