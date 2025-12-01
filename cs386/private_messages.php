<?php
            // if (!isset($_SESSION['username'])) {
            //     header("Location: linku-messages.html");
            //     exit();
            // }

            //for local testing
            if (!isset($_SESSION['username'])) {
                header("Location: views/linku-messages.php");
                exit();
            }

            // Database connection
            $servername = "localhost";
            $username = "linkrlul_OnlineThrifting";
            $password ="MarketplaceDatabase1";
            $dbname = "linkrlul_private_messages";

            $conn = new mysqli($servername, $username, $password, $dbname);
            if ($conn->connect_error) {
                file_put_contents("debug.log", "DB connection failed: " . $conn->connect_error . "\n", FILE_APPEND);
                die("Connection failed: " . $conn->connect_error);
            }

            // Get username from session
            $currentUser = $_SESSION['username'];
         


        // insert message
        $stmt = $pdo->prepare('INSERT INTO messages (conversation_id, sender_id, message, created_at) VALUES (:cid, :sid, :message, datetime("now"))');
        $stmt->execute([':cid' => $conversation_id, ':sid' => $USER_ID, ':message' => $message]);


        // update conversation last_updated
        $stmt = $pdo->prepare('UPDATE conversations SET last_updated = datetime("now") WHERE id = :id');
        $stmt->execute([':id' => $conversation_id]);

        // fetch current user's username for display
        $stmt = $pdo->prepare('SELECT username FROM users WHERE id = :id');
        $stmt->execute([':id' => $USER_ID]);
        $userRow = $stmt->fetch(PDO::FETCH_ASSOC);
        $USERNAME = $userRow ? $userRow['username'] : 'User'. $USER_ID;
?>

        <script>
            const USER_ID = <?php echo json_encode($USER_ID); ?>;
            const CSRF_TOKEN = <?php echo json_encode($CSRF); ?>;
        </script>

