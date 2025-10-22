// app.js
import express from "express";
import path from "path";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // for /styles.css or images

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

// Example product list
const products = [
    { id: 1, name: "T-shirt", price: 20, image: "/images/tshirt.jpg" },
    { id: 2, name: "Jeans", price: 40, image: "/images/jeans.jpg" },
    { id: 3, name: "Sneakers", price: 60, image: "/images/sneakers.jpg" },
    { id: 4, name: "Hat", price: 15, image: "/images/hat.jpg" },
    { id: 5, name: "Jacket", price: 80, image: "/images/jacket.jpg" },
    { id: 6, name: "Socks", price: 10, image: "/images/socks.jpg" }
];
// Shop page
app.get("/shop", (req, res) => {
  res.render("shop", { products, cartCount: 0 });
});

// Example cart route
app.post("/cart/add", (req, res) => {
  const { id } = req.body;
  console.log(`Product added to cart: ${id}`);
  res.redirect("/shop");
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000/shop"));
