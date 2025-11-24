
async function loadListings() 
{
    const res = await fetch("../fetchMyItems.php");
    const items = await res.json();
    const container = document.getElementById("myListings");
    container.innerHTML = "";

    if (!items.length) 
    {
        container.innerHTML = "<p>You have no listings yet.</p>";
        return;
    }
    items.forEach(item => 
    {
        const div = document.createElement("div");
        div.classList.add("listing");
        div.innerHTML = 
        `
        <img src="../../${item.image_path}" alt="${item.item_name}" class="listing-img">
        <h3>${item.item_name}</h3>
        <p>${item.description}</p>
        <p><b>Price:</b> $${Number(item.price).toFixed(2)}</p>
        <button class="edit-btn" data-id="${item.id}">Edit</button>
        <button class="delete-btn" data-id="${item.id}">Delete</button>
        `;

        container.appendChild(div);
    });

    document.querySelectorAll(".edit-btn").forEach(btn =>
    btn.addEventListener("click", (e) => openEdit(e.target.dataset.id))
    );
    document.querySelectorAll(".delete-btn").forEach(btn =>
    btn.addEventListener("click", (e) => deleteItem(e.target.dataset.id))
    );
}

window.onload = loadListings;
async function deleteItem(id) 
{
    if (!confirm("Are you sure you want to delete this item?")) 
        return;

    const formData = new FormData();
    formData.append("id", id);

    const res = await fetch("/deleteItem.php", 
    {
        method: "POST",
        body: formData
    });

    const result = await res.json();
    if (result.success) 
    {
        alert("Item deleted.");
        window.location.reload();
    } 
    else {
        alert("Error in deleting item.");
    }
}
let currentId = null;


function openEdit(id) 
{
    const editMode = new bootstrap.Modal(document.getElementById('editModal'), 
    {
    backdrop: 'static',
    keyboard: true  
    }); 
    currentId = id;
    fetch(`/getItem.php?id=${id}`)
        .then(res => res.json())
        .then(item => 
        {
        document.getElementById("editName").value = item.item_name;
        document.getElementById("editPrice").value = item.price;
        document.getElementById("editDesc").value = item.description;
        editMode.show();
        });
}
async function saveItem() 
{
    // get values
    const updatedName = document.getElementById("editName").value.trim();
    const updatedPrice = document.getElementById("editPrice").value;
    const updatedDesc = document.getElementById("editDesc").value.trim();
    const imageFile = document.getElementById("editImage").files[0];

    // check if form is filled
    if (!updatedName || !updatedPrice || !updatedDesc) {
        alert("Please fill in all fields (Name, Price, and Description).");
        return;
    }

    // make new formdata to push to db
    const formData = new FormData();
    formData.append("id", currentId); // Uses the ID set by openEdit
    formData.append("item_name", updatedName);
    formData.append("price", updatedPrice);
    formData.append("description", updatedDesc);
    if (imageFile) formData.append("image", imageFile);
    try {

        const res = await fetch("../../editItem.php", 
        {
            method: "POST",
            body: formData
        });
        
        const result = await res.json();
        
        if (result.success) 
        {
            alert("Item updated successfully!");
            editMode.hide();
            loadListings();
            window.location.reload();
  
        } else {
            alert("Error updating item: " + (result.error || "Unknown error."));
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("A network error occurred while saving the item.");
    }
}

window.addEventListener("DOMContentLoaded", loadListings);
