<?php
session_start();

if (isset($_SESSION['username'])) 
{
    $user = $_SESSION['username'];
} else {
    $user = "guest";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Catalog</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/cat-style.css">
</head>
<body class="d-flex flex-column min-vh-100 website-b">
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
            <img src="profile.jpeg" alt="Profile" class="profile-icon">
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><a class="dropdown-item" href="/myListings.php">My Listings</a></li>
          <li><a class="dropdown-item" href="#">Messages</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Filter Dropdown -->
  <div class="w-100 mt-2 d-flex justify-content-center gap-4 categories-row">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item dropdown position-static">
        <a class="nav-link dropdown-toggle" class="button" data-bs-toggle="dropdown" aria-expanded="false">
          Clothing
        </a>  
        <div class="dropdown-menu w-100 p-4">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <h6 class="text-uppercase">Clothing</h6>
                <ul class="list-unstyled">
                  <li><a class="dropdown-item" href="#">Men's</a></li>
                  <li><a class="dropdown-item" href="#">Women's</a></li>
                  <li><a class="dropdown-item" href="#">Accessories</a></li>
                </ul>
                <a href="#"> See all clothing listings </a>
              </div>
            </div>
      </li>
      <li class="nav-item dropdown position-static">
        <a class="nav-link dropdown-toggle" class="button" data-bs-toggle="dropdown" aria-expanded="false">
          Miscellaneous
        </a>  
        <div class="dropdown-menu w-100 p-4">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <h6 class="text-uppercase">Miscellaneous</h6>
                <ul class="list-unstyled">
                  <li><a class="dropdown-item" href="#">Furniture</a></li>
                  <li><a class="dropdown-item" href="#">Kitchen</a></li>
                  <li><a class="dropdown-item" href="#">Electronics</a></li>
                </ul>
                <a href="#"> See all miscellaneous listings </a>
              </div>
            </div>
      </li>
    </ul> 
  </div>
</nav>

<main class="flex-grow-1">
  <div class="text-center logo">
    <img src="/assets/Logo.png" alt="Logo" class="img-fluid">
  </div>

  <div class="container">
    <div id="catalogContainer" class="row">

      <?php
      // DB connection
      $conn = new mysqli(
        "localhost",
        "linkrlul_OnlineThrifting",
        "MarketplaceDatabase1",
        "linkrlul_items"
      );

      if ($conn->connect_error) {
        die("Database connection failed");
      }

      $sql = "SELECT * FROM catelogItems ORDER BY id DESC";
      $result = $conn->query($sql);

      if ($result && $result->num_rows > 0):
        while ($row = $result->fetch_assoc()):
      ?>

      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <img src="uploads/<?php echo htmlspecialchars($row['image']); ?>" class="card-img-top">
          <div class="card-body">
            <h5><?php echo htmlspecialchars($row['item_name']); ?></h5>
            <p><?php echo htmlspecialchars($row['description']); ?></p>
            <p class="text-muted">$<?php echo htmlspecialchars($row['price']); ?></p>

            <p>
              <strong>Category:</strong> <?php echo $row['category']; ?><br>
              <strong>Color:</strong> <?php echo $row['color']; ?><br>
              <strong>Size:</strong> <?php echo $row['size']; ?><br>
              <strong>Material:</strong> <?php echo $row['material']; ?>
            </p>

            <div class="d-flex gap-2">
              <a href="editItem.php?id=<?php echo $row['id']; ?>" class="btn btn-sm btn-primary">Edit</a>
              <a href="deleteItem.php?id=<?php echo $row['id']; ?>" class="btn btn-sm btn-danger"
                 onclick="return confirm('Delete item?');">Delete</a>
            </div>
          </div>
        </div>
      </div>

      <?php
        endwhile;
      else:
        echo "<p>No items found.</p>";
      endif;

      $conn->close();
      ?>

    </div>
  </div>

</main>

<footer class="bg-dark text-white mt-auto py-3">
  <div class="container">
    <div class="d-flex justify-content-between flex-wrap">
      <div>
        <h6>About</h6>
        <ul class="list-unstyled">
          <li><a href="#" class="footer-link">Our Story</a></li>
          <li><a href="#" class="footer-link">Team</a></li>
        </ul>
      </div>

      <div>
        <h6>Help</h6>
        <ul class="list-unstyled">
          <li><a href="#" class="footer-link">Help Center</a></li>
          <li><a href="#" class="footer-link">FAQs</a></li>
        </ul>
      </div>

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

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<script>
  const CURRENT_USER = "<?php echo htmlspecialchars($user, ENT_QUOTES); ?>";
</script>

<script src="assets/js/catalog.js"></script>
<script src="assets/js/cart-module.js"></script>

</body>
</html>
