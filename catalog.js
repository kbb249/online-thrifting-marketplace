// Load all catalog items from database
async function loadCatalog() {
    try {
        const res = await fetch("/fetchItems.php"); // ✅ absolute path
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error loading catalog:", error);
        return [];
    }
}

// Handles the add item form if present on the page
function setupAddItemForm() {
    const form = document.getElementById("addItemForm");
    if (!form) return;

    form.addEventListener("submit", async function(e) {
    e.preventDefault();
    const newItem = getFormItemData();
    const formData = new FormData();

    for (const key in newItem) formData.append(key, newItem[key]);

        const imageInput = document.getElementById("itemImage");
        if (imageInput && imageInput.files.length > 0) {
            formData.append("image", imageInput.files[0]); 
        }

        try {
            await fetch("/addItem.php", {
                method: "POST",
                body: formData
            });
            alert("Item added!");
            window.location.href = "/linku-catalog.html";
        } catch (err) {
            console.error(err);
            alert("Failed to add item.");
        }
    });
}

// Collects form data
function getFormItemData() {
    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value;
    const color = document.getElementById("color").value;
    const size = document.getElementById("size").value;
    const material = document.getElementById("material").value;
    const description = document.getElementById("description").value.trim();
    const price = parseFloat(document.getElementById("price").value) || 0;


    return { item_name: name, category, color, size, material, description, price };
}

// Setup catalog page
function setupCatalogPage() {
    const catalogContainer = document.getElementById("catalogContainer");
    if (!catalogContainer) return;

    const searchInput = document.querySelector("input.search-b") || document.getElementById("searchBar");
    const searchButton = document.querySelector("button.search-b");
    const filterCategory = document.getElementById("filterCategory");
    const filterColor = document.getElementById("filterColor");
    const filterSize = document.getElementById("filterSize");
    const filterMaterial = document.getElementById("filterMaterial");

    let catalogItems = [];

    async function renderCatalog() {
        catalogItems = await loadCatalog(); // reload from DB
        console.log("Fetched items:", catalogItems); 
        catalogContainer.innerHTML = "";
        const filters = getFilters(searchInput, filterCategory, filterColor, filterSize, filterMaterial);

        catalogItems.forEach(item => {
            if (matchesFilters(item, filters)) {
                const card = createCatalogCard(item);
                catalogContainer.appendChild(card);
            }
        });
    }

    // Delete or edit an item
    catalogContainer.addEventListener("click", async function(e) {
        const button = e.target.closest(".btn-delete");
        if (button) {
            const id = button.dataset.id;
            if (confirm("Delete this item?")) {
                try {
                    await fetch("/deleteItem.php", {
                        method: "POST",
                        body: new URLSearchParams({ id })
                    });
                    renderCatalog(); // refresh
                } catch (err) {
                    console.error(err);
                    alert("Failed to delete item.");
                }
            }
        }

        const editButton = e.target.closest(".btn-edit");
        if (editButton) {
            const id = editButton.dataset.id;
            window.location.href = `/edit-item.html?id=${id}`;
        }
    });

    // Filters
    const filters = [filterCategory, filterColor, filterSize, filterMaterial];
    for (const f of filters) if (f) f.addEventListener("change", renderCatalog);

    // Search
    if (searchButton) searchButton.addEventListener("click", e => {
        e.preventDefault();
        renderCatalog();
    });

    if (searchInput) searchInput.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            e.preventDefault();
            renderCatalog();
        }
    });

    renderCatalog();
}

// Collect filter values
function getFilters(searchInput, cat, color, size, material) {
    return {
        query: searchInput?.value.trim().toLowerCase() || "",
        category: cat?.value || "",
        color: color?.value || "",
        size: size?.value || "",
        material: material?.value || ""
    };
}

// Check if item matches filters
function matchesFilters(item, filters) {
    const name = (item.item_name || "").toLowerCase();
    const desc = (item.description || "").toLowerCase();

    const searchMatch = !filters.query ||
        name.includes(filters.query) ||
        desc.includes(filters.query) ||
        (item.category || "").toLowerCase().includes(filters.query) ||
        (item.color || "").toLowerCase().includes(filters.query) ||
        (item.size || "").toLowerCase().includes(filters.query) ||
        (item.material || "").toLowerCase().includes(filters.query);

    return searchMatch &&
        (!filters.category || item.category === filters.category) &&
        (!filters.color || item.color === filters.color) &&
        (!filters.size || item.size === filters.size) &&
        (!filters.material || item.material === filters.material);
}

// Create item card
function createCatalogCard(item) {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    const image = item.image ? `/uploads/${item.image}` : "/uploads/default.jpg"; 
    const price = item.price ? Number(item.price).toFixed(2) : "0.00";

    let buttons = "";
    if (item.username === CURRENT_USER) {
        buttons = `
            <button class="btn btn-warning btn-sm btn-edit" data-id="${item.id}">Edit</button>
            <button class="btn btn-danger btn-sm btn-delete" data-id="${item.id}">Delete</button>
        `;
    }

    card.innerHTML = `
        <div class="card h-100">
            <img src="${image}" class="card-img-top" alt="${item.item_name} image" style="height:200px;object-fit:cover" onerror="this.src='/uploads/default.jpg'">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${item.item_name}</h5>
                <div class="mb-2">
                    <span class="badge bg-secondary me-1">Category: ${item.category || "—"}</span>
                    <span class="badge bg-info text-dark me-1">Color: ${item.color || "—"}</span>
                    <span class="badge bg-warning text-dark me-1">Size: ${item.size || "—"}</span>
                    <span class="badge bg-light text-dark">Material: ${item.material || "—"}</span>
                </div>
                <p class="card-text small text-muted">${item.description}</p>
                <div class="mt-auto d-flex justify-content-between align-items-center">
                    <p class="card-text text-success fw-bold mb-0">$${price}</p>
                    ${buttons}
                </div>
            </div>
        </div>
    `;
    return card;
}

// Initialize
document.addEventListener("DOMContentLoaded", function() {
    setupAddItemForm();
    setupCatalogPage();
});

