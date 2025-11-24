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
<div class="modal fade" id="editModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      
      <div class="modal-header">
        <h5 class="modal-title" id="editModalLabel">Edit Item</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        <form id="editFormFields">
          <div class="mb-3">
            <label for="editName" class="form-label">Item Name</label>
            <input type="text" class="form-control" id="editName" placeholder="Item name">
          </div>

          <div class="mb-3">
            <label for="editPrice" class="form-label">Price</label>
            <input type="number" class="form-control" id="editPrice" placeholder="Price">
          </div>

          <div class="mb-3">
            <label for="editDesc" class="form-label">Description</label>
            <textarea class="form-control" id="editDesc" placeholder="Description" rows="3"></textarea>
          </div>

          <div class="mb-3">
            <label for="editImage" class="form-label">Image</label>
            <input type="file" class="form-control" id="editImage">
          </div>
        </form>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="saveEditBtn" onclick="saveItem()">Save</button>
      </div>

    </div>
  </div>
</div>
</body>
</html>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src ="./assets/js/mylistings.js"></script>