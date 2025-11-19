document.addEventListener("DOMContentLoaded", () => {
  console.log("editItem.js loaded"); // confirm script is running

  const form = document.getElementById("editItemForm");
  console.log("Form object:", form); // confirm form is found

  const itemId = new URLSearchParams(window.location.search).get("id");
  if (!itemId) {
    console.warn("No item ID found in URL");
    return;
  }

  document.getElementById("itemId").value = itemId;


  // Fetch item data and populate form
  fetch(`/getItem.php?id=${itemId}`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch item");
      return res.json();
    })
    .then(item => {
      if (!item) {
        alert("Item not found or access denied.");
        window.location.href = "/linku-catalog.html";
        return;
      }
      document.getElementById("name").value = item.item_name;
      document.getElementById("category").value = item.category;
      document.getElementById("color").value = item.color;
      document.getElementById("size").value = item.size;
      document.getElementById("material").value = item.material;
      document.getElementById("description").value = item.description;
      document.getElementById("price").value = item.price;
    })
    .catch(err => {
      console.error("Error loading item:", err);
      alert("Unable to load item.");
      window.location.href = "/linku-catalog.html";
    });

  // Handle form submission
  form.addEventListener("submit", async e => {
    e.preventDefault();
    console.log("Form submit intercepted");

    const formData = new FormData(form);
    formData.append("id", itemId);
    formData.append("activity_type", "Edit Item");
    formData.append("details", `User updated item ID ${itemId}`);

    try {
      const response = await fetch("/editItem.php", {
        method: "POST",
        body: formData
        credentials: "include"
      });

      if (!response.ok) throw new Error("Update failed");
      console.log("Item updated successfully");

      alert("Item updated!");
      window.location.href = "/linku-catalog.html";
    } catch (err) {
      console.error(err);
      alert("Failed to update item.");
    }
  });
});