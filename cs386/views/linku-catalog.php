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

  <div class="d-flex align-items-center">

    <select class="form-select header-s rounded-bottom w-25">
      <option>Option 1</option>
      <option>1</option>
      <option>2</option>
    </select>

    <select class="form-select header-s rounded-bottom w-25">
      <option>Option 2</option>
      <option>A</option>
      <option>B</option>
    </select>

    <select class="form-select header-s rounded-bottom w-25">
      <option>Option 3</option>
      <option>X</option>
      <option>Y</option>
    </select>

    <select class="form-select header-s rounded-bottom w-25">
      <option>Option 4</option>
      <option>M</option>
      <option>N</option>
    </select>

  <div class="input-group mb-0 w-50">
    <input type="text" class="form-control search-b" placeholder="Search...">
    <button class="btn btn-primary search-b">Search</button>
  </div>
</div>

<!-- Filters -->
<div class="container mb-3">
  <div class="row g-2 align-items-center">

    <div class="col-md-2">
      <select class="form-select" id="filterCategory">
        <option value="">All Categories</option>
        <option value="Shirts">Shirts</option>
        <option value="Pants">Pants</option>
        <option value="Shoes">Shoes</option>
      </select>
    </div>

    <div class="col-md-2">
      <select class="form-select" id="filterColor">
        <option value="">All Colors</option>
        <option value="Red">Red</option>
        <option value="Blue">Blue</option>
        <option value="Green">Green</option>
        <option value="Black">Black</option>
        <option value="White">White</option>
      </select>
    </div>

    <div class="col-md-2">
      <select class="form-select" id="filterSize">
        <option value="">All Sizes</option>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
    </div>

    <div class="col-md-2">
      <select class="form-select" id="filterMaterial">
        <option value="">All Materials</option>
        <option value="Cotton">Cotton</option>
        <option value="Leather">Leather</option>
        <option value="Polyester">Polyester</option>
      </select>
    </div>

    <div class="col-md-2">
      <a href="/linku-add-item.html" class="btn btn-success w-100">Add New Item</a>
    </div>
  </div>
</div>

<main class="flex-grow-1">
  <div class="text-center logo">
    <img src="logo.png" alt="Logo" class="img-fluid">
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
</body>
</html>
