<?php
require "../config.php";

$sender_id = $_SESSION['user_id'];
$conversation_id = intval($_POST['conversation_id']);
$message = trim($_POST['message']);

if ($message === "") exit("empty");

$stmt = $pdo->prepare("INSERT INTO messages (conversation_id, sender_id, message, created_at)
                       VALUES (?, ?, ?, NOW())");
$stmt->execute([$conversation_id, $sender_id, $message]);
?>