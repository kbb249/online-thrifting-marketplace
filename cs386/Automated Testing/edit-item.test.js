/**
 * @jest-environment jsdom
 */

beforeEach(() => {
  // Set up DOM
  document.body.innerHTML = `
    <form id="editItemForm">
      <input id="itemId" />
      <input id="name" />
      <input id="category" />
      <input id="color" />
      <input id="size" />
      <input id="material" />
      <textarea id="description"></textarea>
      <input id="price" />
    </form>
  `;

  // Mock fetch
  global.fetch = jest.fn();
});

test("fills form fields after fetch", async () => {
  // Mock backend response
  fetch.mockResolvedValueOnce({
    ok: true,
    json: () =>
      Promise.resolve({
        item_name: "Shirt",
        category: "Clothing",
        color: "Blue",
        size: "M",
        material: "Cotton",
        description: "Nice shirt",
        price: "20"
      })
  });

  // Mock URLSearchParams to return id=123
  const mockGet = jest.fn().mockReturnValue("123");
  global.URLSearchParams = jest.fn(() => ({
    get: mockGet
  }));

  // Load script
    require("./edit-item.js");

  // Trigger DOMContentLoaded
  document.dispatchEvent(new Event("DOMContentLoaded"));

  // Wait for fetch promises to resolve
  await new Promise(process.nextTick);

  // Check that form fields were filled correctly
  expect(document.getElementById("itemId").value).toBe("123");
  expect(document.getElementById("name").value).toBe("Shirt");
  expect(document.getElementById("category").value).toBe("Clothing");
  expect(document.getElementById("color").value).toBe("Blue");
  expect(document.getElementById("size").value).toBe("M");
  expect(document.getElementById("material").value).toBe("Cotton");
  expect(document.getElementById("description").value).toBe("Nice shirt");
  expect(document.getElementById("price").value).toBe("20");

  // Check that fetch was called correctly
  expect(fetch).toHaveBeenCalledWith("/getItem.php?id=123");
});
