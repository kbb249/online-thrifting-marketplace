<?php
function getTestConnection() {
    return new mysqli('localhost', 'linkrlul_OnlineThrifting', 'MarketplaceDatabase1', 'linkrlul_items');;
}

function createTestUserSession() {
    $_SESSION['username'] = 'testuser';
}

function cleanupTestItems($conn) {
    $conn->query("DELETE FROM catelogItems WHERE username = 'testuser'");
}
?>
