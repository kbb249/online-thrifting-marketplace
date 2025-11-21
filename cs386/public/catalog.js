// catalog.js — rewritten to use Cart central module only

// Load all catalog items from database
async function loadCatalog() {
    try {
        const res = await fetch("/fetchItems.php");
        return await res.json();
    } catch (error) {
        console.error("Error loading catalog:", error);
        return [];
    }
}

// Add item form
function setupAddItemForm() {
    const form = document.getElementById("addItemForm");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
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


// ---------- Catalog Page Setup ----------

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
        catalogItems = await loadCatalog();
        catalogContainer.innerHTML = "";
        const filters = getFilters(searchInput, filterCategory, filterColor, filterSize, filterMaterial);

        catalogItems.forEach(item => {
            if (matchesFilters(item, filters)) {
                const card = createCatalogCard(item);
                catalogContainer.appendChild(card);
            }
        });
    }

    // Delete or edit item
    catalogContainer.addEventListener("click", async function (e) {
        const deleteBtn = e.target.closest(".btn-delete");
        if (deleteBtn) {
            const id = deleteBtn.dataset.id;
            if (confirm("Delete this item?")) {
                try {
                    await fetch("/deleteItem.php", {
                        method: "POST",
                        body: new URLSearchParams({ id })
                    });
                    renderCatalog();
                } catch (err) {
                    console.error(err);
                    alert("Failed to delete item.");
                }
            }
        }

        const editBtn = e.target.closest(".btn-edit");
        if (editBtn) {
            const id = editBtn.dataset.id;
            window.location.href = `/edit-item.html?id=${id}`;
        }
    });

    // Filters + search
    const filters = [filterCategory, filterColor, filterSize, filterMaterial];
    filters.forEach(f => f?.addEventListener("change", renderCatalog));

    searchButton?.addEventListener("click", e => {
        e.preventDefault();
        renderCatalog();
    });

    searchInput?.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            e.preventDefault();
            renderCatalog();
        }
    });

    renderCatalog();
}

// Filters
function getFilters(searchInput, cat, color, size, material) {
    return {
        query: searchInput?.value.trim().toLowerCase() || "",
        category: cat?.value || "",
        color: color?.value || "",
        size: size?.value || "",
        material: material?.value || ""
    };
}

// Filter logic
function matchesFilters(item, filters) {
    const name = (item.item_name || "").toLowerCase();
    const desc = (item.description || "").toLowerCase();

    const searchMatch =
        !filters.query ||
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

    const wrapper = document.createElement("div");
    wrapper.className = "card h-100";

    const image = document.createElement("img");
    image.src = item.image ? `/uploads/${item.image}` : "/uploads/default.jpg";
    image.alt = `${item.item_name || ""} image`;
    image.className = "card-img-top";
    image.style.height = "200px";
    image.style.objectFit = "cover";
    image.onerror = function () { this.src = "/uploads/default.jpg"; };

    const body = document.createElement("div");
    body.className = "card-body d-flex flex-column";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = item.item_name || "";

    // badges container
    const badgeContainer = document.createElement("div");
    badgeContainer.className = "mb-2";

    function createBadge(label, value, classes) {
        const span = document.createElement("span");
        span.className = classes;
        span.textContent = `${label}: ${value || "—"}`;
        return span;
    }

    badgeContainer.appendChild(createBadge("Category", item.category, "badge bg-secondary me-1"));
    badgeContainer.appendChild(createBadge("Color", item.color, "badge bg-info text-dark me-1"));
    badgeContainer.appendChild(createBadge("Size", item.size, "badge bg-warning text-dark me-1"));
    badgeContainer.appendChild(createBadge("Material", item.material, "badge bg-light text-dark"));

    const desc = document.createElement("p");
    desc.className = "card-text small text-muted";
    desc.textContent = item.description || "";

    const footer = document.createElement("div");
    footer.className = "mt-auto d-flex justify-content-between align-items-center";

    const priceEl = document.createElement("p");
    priceEl.className = "card-text text-success fw-bold mb-0";
    priceEl.textContent = `$${(Number(item.price) || 0).toFixed(2)}`;

    // Add-to-Cart Button
    const addBtn = document.createElement("button");
    addBtn.className = "btn btn-success btn-sm btn-add-cart";
    addBtn.textContent = "Add to Cart";
    addBtn.dataset.id = item.id;
    addBtn.dataset.name = item.item_name || "";
    addBtn.dataset.price = Number(item.price) || 0;
    addBtn.dataset.image = image.src;

    footer.appendChild(priceEl);
    footer.appendChild(addBtn);

    // Owner buttons (Edit/Delete)
    if (item.username === CURRENT_USER) {
        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-warning btn-sm btn-edit ms-2";
        editBtn.textContent = "Edit";
        editBtn.dataset.id = item.id;

        const delBtn = document.createElement("button");
        delBtn.className = "btn btn-danger btn-sm btn-delete ms-2";
        delBtn.textContent = "Delete";
        delBtn.dataset.id = item.id;

        footer.appendChild(editBtn);
        footer.appendChild(delBtn);
    }

    // assemble card
    body.appendChild(title);
    body.appendChild(badgeContainer);
    body.appendChild(desc);
    body.appendChild(footer);

    wrapper.appendChild(image);
    wrapper.appendChild(body);

    card.appendChild(wrapper);

    return card;
}

// Add-to-cart button (centralized)
document.addEventListener("click", function (e) {
    const btn = e.target.closest(".btn-add-cart");
    if (!btn) return;

    Cart.add({
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: btn.dataset.price,
        image: btn.dataset.image
    });

    window.location.href = "/linku-cart.html";
});


// Initialize catalog page
document.addEventListener("DOMContentLoaded", function () {
    setupAddItemForm();
    setupCatalogPage();
});
