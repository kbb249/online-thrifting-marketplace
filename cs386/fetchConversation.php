<?php

$conversation_id = intval($_GET['conversation_id']);

$stmt = $pdo->prepare("
    SELECT m.*, u.username
    FROM messages m
    JOIN users u ON m.sender_id = u.id
    WHERE m.conversation_id = ?
    ORDER BY m.created_at ASC
");
$stmt->execute([$conversation_id]);

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>