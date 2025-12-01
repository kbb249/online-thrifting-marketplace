<?php
session_start();

// Redirect if not logged in
// if (!isset($_SESSION['username'])) {
//     header("Location: linku-login.html");
//     exit();
// }

// assume $pdo from config.php
            $USER_ID = $_SESSION['user_id'] ?? null;
            $conversation_id = intval($_POST['conversation_id'] ?? 0);
            $message = trim($_POST['message'] ?? '');

            if ($USER_ID && $conversation_id && $message !== '') {
                $stmt = $pdo->prepare('INSERT INTO messages (conversation_id, sender_id, message, created_at) VALUES (:cid, :sid, :message, NOW())');
                $stmt->execute([':cid' => $conversation_id, ':sid' => $USER_ID, ':message' => $message]);

                $stmt = $pdo->prepare('UPDATE conversations SET last_updated = NOW() WHERE id = :id');
                $stmt->execute([':id' => $conversation_id]);
            }

$conversation_id = $_GET["conversation_id"] ?? 1;  
$_SESSION["user_id"] = 123; // test
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Bootstrap CSS (helps with layout and styling) -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

        <!-- Custom CSS file (not created yet)-->
        <link rel="stylesheet" href="/cs386/public/messages-style.css">
        <title>LinkU Messages</title> 
        <script>
        // Dynamically load from PHP session or request
        const CURRENT_CONVERSATION_ID = <?php echo json_encode($conversation_id); ?>;
        const USER_ID = <?php echo json_encode($_SESSION['user_id']); ?>;
        </script>
    </head>
    <body class="d-flex flex-column min-vh-100 website-b" 
        style="background-color:blanchedalmond; overflow-x: hidden" onload="loadConversations();">
        <div class = "ps-2 pb-2 mb-0 h1 top-bar row">
            <div class="row">
                <!-- link to catalog -->
                <div class="col-3">
                    <a href="/linku-catalog.php">
                        <img src="/assets/Logo.png" alt="LinkU Logo" class="navbar-logo" style="height:50px; width:auto; display:block;">
                    </a>
                </div>
                <div class="justify-content-end col-9">Messages</div>
                <br>
            </div>
        </div>
        <div class="p-1 row">
            <!-- select user to chat with -->
            <div class="col-3 ps-4 pt-2" style="background-color:bisque;">
                <ul class="list-unstyled justify-content-between">
                    <li>Person1</li>
                    <hr>
                    <li>Person2</li>
                    <hr>
                    <li>Person3</li>
                    <hr>
                </ul>
            </div>

            <!-- chat messages -->
            <div class="col-9" id="chatbox">
                <h2 class="text-center">Chat</h2>
                <hr>

                <!-- text box for chat-->
                <div class="align-items-end row min-vh-100 text-wrap">
                    <!-- chat messages example-->
                    <div class="container align-self-start" id="chat"></div>
                    <!-- chat text box-->
                    <div class="row">
                        <hr>
                        <div class="mb-2 mt-2 col-10 pb-2">
                            <input type="text" class="form-control" id="messageInput" placeholder="Type a message...">
                        </div>
                        <div class="mb-2 mt-2 col-1 pb-2 me-1">
                            <button type="button" class="btn btn-primary text-white" onclick="appendMessage(messageInput.value.trim()); messageInput.value = '';">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        

        <!-- Bootstrap JS -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
        <script src="/cs386/public/messaging.js"></script>
    </body>

    <!-- Footer at bottom -->
    <footer class="bg-dark text-white mt-auto py-3">
        <div class="container">
            <div class="d-flex justify-content-between flex-wrap">
                <!-- About section -->
                <div>
                <h6>About</h6>
                <ul class="list-unstyled">
                    <li><a href="#" class="footer-link">Our Story</a></li>
                    <li><a href="#" class="footer-link">Team</a></li>
                </ul>
                </div>

                <!-- Help section -->
                <div>
                <h6>Help</h6>
                <ul class="list-unstyled">
                    <li><a href="#" class="footer-link">Help Center</a></li>
                    <li><a href="#" class="footer-link">FAQs</a></li>
                </ul>
                </div>

                <!-- Connect section -->
                <div>
                <h6>Connect</h6>
                <ul class="list-unstyled">
                    <li><a href="#" class="footer-link">Facebook</a></li>
                    <li><a href="#" class="footer-link">Instagram</a></li>
                </ul>
                </div>
            </div>
        </div>
    </footer>
</html>