<?php
session_start();
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>My Listings</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/myListings.css">
    <script src="mylistings.js"></script>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light border-bottom sticky-top px-3 py-2">
  <div class="d-flex w-100 align-items-center justify-content-between">
    <!-- Logo -->
    <a href="/linku-catalog.php">
      <img src="/assets/Logo.png" alt="LinkU Logo" class="navbar-logo" style="height:50px; width:auto; display:block;">
    </a>

    <!-- Search Bar -->
    <div class="top-search">
        <input type="text" class="form-control search-b" placeholder="Search...">
        <button class="btn btn-primary search-b">Search</button>
    </div>
    <!-- add new item and prof-->
    <div class="d-flex align-items-center gap-3">
      <a href="/linku-add-item.html" class="btn btn-success add-itemBtn">Add New Item</a>

      <div class="dropdown">
        <button class="btn p-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="/assets/profile.jpeg" alt="Profile" class="profile-icon">
        </button>
        <span class="me-2 fw-semibold">
          <?php echo htmlspecialchars($user); ?>
        </span>
        <ul class="profile-dropdown dropdown-menu dropdown-menu-end">
          <li class="dropdown-header">
            Welcome, <strong><?php echo htmlspecialchars($user); ?></strong> !
          </li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><a class="dropdown-item" href="/myListings.php">My Listings</a></li>
          <li><a class="dropdown-item" href="#">Messages</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
        </ul>
      </div>
    </div>
  </div>
</nav>
<h1 class = "top-msg" >My Listings</h1>
<div id="myListings"></div>
<div id="editForm">
    <h2>Edit Item</h2>

    <input id="editName" placeholder="Item name"><br><br>
    <input id="editPrice" placeholder="Price"><br><br>
    <textarea id="editDesc" placeholder="Description"></textarea><br><br>
    <input type="file" id="editImage"> 
    <button onclick="saveItem()">Save</button>
    <button onclick="closeEdit()">Cancel</button>
</div>
</body>
</html>
<script src ="./assets/js/mylistings.js"></script>