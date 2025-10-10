<script>
  const searchInput = document.querySelector('.search-b');
  const searchBtn = document.querySelector('.search-b.btn');
  const filters = document.querySelectorAll('.filter');
  const items = document.querySelectorAll('.item-edit');

  function filterItems() {
    const searchText = searchInput.value.toLowerCase();
    const category = document.getElementById('filterCategory').value;
    const color = document.getElementById('filterColor').value;
    const size = document.getElementById('filterSize').value;
    const material = document.getElementById('filterMaterial').value;

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let matchesSearch = item.textContent.toLowerCase().includes(searchText);
      let matchesCategory = category === "" || item.dataset.category === category;
      let matchesColor = color === "" || item.dataset.color === color;
      let matchesSize = size === "" || item.dataset.size === size;
      let matchesMaterial = material === "" || item.dataset.material === material;

      if (matchesSearch && matchesCategory && matchesColor && matchesSize && matchesMaterial) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    }
  }

  searchBtn.addEventListener('click', filterItems);
  searchInput.addEventListener('keyup', filterItems);

  for (let i = 0; i < filters.length; i++) {
    filters[i].addEventListener('change', filterItems);
  }
</script>

