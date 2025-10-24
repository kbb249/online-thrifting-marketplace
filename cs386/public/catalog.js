// this key is used to store and load items from localStorage
const STORAGE_KEY = "catalogItems";

// load all catalog items from localStorage
function loadCatalog() 
{
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) 
    {
        return JSON.parse(data);
    }
    return [];
}

// save all catalog items to localStorage
function saveCatalog(items) 
{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// handles the add item form if present on the page
function setupAddItemForm() 
{
    const form = document.getElementById("addItemForm");
    if (!form) return;

    form.addEventListener("submit", function (e) 
    {
        e.preventDefault(); 

        const newItem = getFormItemData(); // get form data as an object
        const items = loadCatalog();       // load existing catalog items
        items.push(newItem);               // aad new item
        saveCatalog(items);                // save to localStorage

        alert("Item added!");              // notify user
        window.location.href = "/catalog"; // redirect to catalog page
    });
}

// collects and returns form data for a new item
function getFormItemData() 
{
    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value;
    const color = document.getElementById("color").value;
    const size = document.getElementById("size").value;
    const material = document.getElementById("material").value;
    const description = document.getElementById("description").value.trim();

    // parse price safely
    const priceInput = document.getElementById("price").value;
    let price = 0;
    if (priceInput) 
    {
        price = Number(parseFloat(priceInput).toFixed(2));
    }

    // handle image input or use default image
    const imageInput = document.getElementById("itemImage");
    let image = "default.jpg";
    if (imageInput && imageInput.files && imageInput.files.length > 0) 
    {
        image = imageInput.files[0].name;
    }

    // return item object
    return { name, category, color, size, material, description, price, image };
}
 
// handles displaying, filtering, searching, and deleting items
function setupCatalogPage() 
{
    const catalogContainer = document.getElementById("catalogContainer");
    if (!catalogContainer) return; // Stop if not on catalog page

    // search bar and filters
    const searchInput = document.querySelector("input.search-b") || document.getElementById("searchBar");
    const searchButton = document.querySelector("button.search-b");

    const filterCategory = document.getElementById("filterCategory");
    const filterColor = document.getElementById("filterColor");
    const filterSize = document.getElementById("filterSize");
    const filterMaterial = document.getElementById("filterMaterial");

    // load saved catalog
    let catalogItems = loadCatalog(); 

    // render catalog items to the page
    function renderCatalog() 
    {
        catalogContainer.innerHTML = ""; // Clear existing content
        const filters = getFilters(searchInput, filterCategory, filterColor, filterSize, filterMaterial);

        // loop through items and display only matching ones
        for (let i = 0; i < catalogItems.length; i++) 
        {
            const item = catalogItems[i];
            if (matchesFilters(item, filters)) 
            {
                const card = createCatalogCard(item, i);
                catalogContainer.appendChild(card);
            }
        }
    }

    // handle deleting an item
    function handleDelete(index) 
    {
        if (confirm("Delete this item?")) 
        {
            catalogItems.splice(index, 1); // Remove from array
            saveCatalog(catalogItems);     // Save updated list
            renderCatalog();               // Re-render catalog
        }
    }

    // listen for delete button clicks
    catalogContainer.addEventListener("click", function (e) 
    {
        const button = e.target.closest(".btn-delete");
        if (button) 
        {
            const index = Number(button.dataset.index);
            handleDelete(index);
        }
    });

    // re-render when filters change
    const filters = [filterCategory, filterColor, filterSize, filterMaterial];
    for (const filterDropdown of filters) 
        {
        if (filterDropdown) 
        {
        filterDropdown.addEventListener("change", renderCatalog);
        }
    }

    // search button click
    if (searchButton) 
    {
        searchButton.addEventListener("click", function (e) 
        {
            e.preventDefault();
            renderCatalog();
        });
    }

    // search on pressing Enter
    if (searchInput) 
    {
        searchInput.addEventListener("keydown", function (e) 
        {
            if (e.key === "Enter") 
            {
                e.preventDefault();
                renderCatalog();
            }
        });
    }

    // initial catalog display
    renderCatalog();
}

// collects filter values safely
function getFilters(searchInput, cat, color, size, material) 
{
    const filters = {};

    if (searchInput && searchInput.value) 
        {
        filters.query = searchInput.value.trim().toLowerCase();
    } 
    else 
    {
        filters.query = "";
    }

    if (cat && cat.value) 
    {
        filters.category = cat.value;
    } 
    else 
    {
        filters.category = "";
    }

    if (color && color.value) 
    {
        filters.color = color.value;
    } 
    else 
    {
        filters.color = "";
    }

    if (size && size.value) 
    {
        filters.size = size.value;
    }
    else 
    {
        filters.size = "";
    }

    if (material && material.value) 
    {
        filters.material = material.value;
    }
    else 
    {
        filters.material = "";
    }

    return filters;
}

// Checks if an item matches the given filters
function matchesFilters(item, filters) 
{
    const name = (item.name || "").toLowerCase();
    const desc = (item.description || "").toLowerCase();
    const category = item.category || "";
    const color = item.color || "";
    const size = item.size || "";
    const material = item.material || "";

    // Search text match
    let searchMatch = true;
    if (filters.query) 
    {
        const q = filters.query;
        searchMatch =
            name.includes(q) ||
            desc.includes(q) ||
            category.toLowerCase().includes(q) ||
            color.toLowerCase().includes(q) ||
            size.toLowerCase().includes(q) ||
            material.toLowerCase().includes(q);
    }

    // dropdown matches
    const categoryMatch = filters.category === "" || category === filters.category;
    const colorMatch = filters.color === "" || color === filters.color;
    const sizeMatch = filters.size === "" || size === filters.size;
    const materialMatch = filters.material === "" || material === filters.material;

    // return true if all match
    return searchMatch && categoryMatch && colorMatch && sizeMatch && materialMatch;
}

// creates and returns a visual card for a catalog item
function createCatalogCard(item, index) 
{
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    // handle image and price safely
    const image = item.image || "default.jpg";
    let price = "0.00";
    if (item.price && !Number.isNaN(item.price)) 
    {
        price = Number(item.price).toFixed(2);
    }

    // build the item card HTML
    card.innerHTML = `
        <div class="card h-100">
            <img src="${image}" class="card-img-top" alt="${item.name} image" style="height:200px;object-fit:cover">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${item.name}</h5>
                <div class="mb-2">
                    <span class="badge bg-secondary me-1">Category: ${item.category || "—"}</span>
                    <span class="badge bg-info text-dark me-1">Color: ${item.color || "—"}</span>
                    <span class="badge bg-warning text-dark me-1">Size: ${item.size || "—"}</span>
                    <span class="badge bg-light text-dark">Material: ${item.material || "—"}</span>
                </div>
                <p class="card-text small text-muted">${item.description}</p>
                <div class="mt-auto d-flex justify-content-between align-items-center">
                    <p class="card-text text-success fw-bold mb-0">$${price}</p>
                    <button class="btn btn-danger btn-sm btn-delete" data-index="${index}">Delete</button>
                </div>
            </div>
        </div>
    `;
    return card;
}


// when the page finishes loading, set up the correct functionality
document.addEventListener("DOMContentLoaded", function () 
{
    setupAddItemForm();  // set up add item form if present
    setupCatalogPage();  // set up catalog display if present
});

// for testing in Node (Jest)
if (typeof module !== "undefined") 
{
  module.exports = { loadCatalog, saveCatalog, matchesFilters, getFilters };
}