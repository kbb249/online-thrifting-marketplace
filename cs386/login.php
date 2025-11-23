<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// -------------------------------
// CSRF TOKEN GENERATION
// -------------------------------
//if (empty($_SESSION['csrf_token'])) {
//    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
//}

//database connection variables
$servername = "localhost";
$username = "linkrlul_OnlineThrifting";
$password ="MarketplaceDatabase1";
$dbname = "linkrlul_userAccount";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
//if ($conn->connect_error) {
 //   die("Connection failed: " . $conn->connect_error);
//}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // ---------------------------------------
    // CSRF TOKEN VALIDATION (ADD THIS)
    // ---------------------------------------
   // if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
      //  die("CSRF token mismatch — possible CSRF attack blocked.");
    //}
    
    
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
            header("Location: linku-catalog.php");
            exit();
        } else {
            header("Location: linku-login.html?error=Incorrect+password");
            exit();
        }
    } else {
        header("Location: linku-login.html?error=Username+not+found");
        exit();
    }

    $stmt->close();
    $_POST['activity_type'] = 'Loggin ';
    $_POST['details'] = "user logged in";
    include 'log-activity.php';
}

$conn->close();
?>



