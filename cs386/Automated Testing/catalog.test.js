/**
 * @jest-environment jsdom
 */
// this tells Jest to use a fake browser environment (jsdom) 
// so we can test DOM elements like document.getElementById

// import the functions we want to test from catalog.js
const { loadCatalog, saveCatalog, matchesFilters, getFilters, createCatalogCard } = require('./catalog.js');

// this function runs before each test automatically
beforeEach(() => 
    {
    // clear localStorage so tests start fresh
    localStorage.clear();         
    // clear the DOM 
    document.body.innerHTML = ''; 
});

// test saveCatalog and loadCatalog

// define a test with a description of what it does
test('saveCatalog and loadCatalog store and retrieve items', () => 
{
    // create a sample item
    const items = [{ name: 'Shirt', category: 'Clothing' }]; 
    // save the item to localStorage
    saveCatalog(items);           
    // load the item back from localStorage
    const loaded = loadCatalog(); 
    // check if the loaded item matches what we saved
    expect(loaded).toEqual(items); 
});

// test matchesFilters function
// test that matchesFilters returns true when the item matches the search query
test('matchesFilters returns true for matching query', () => 
{
    const item = 
    {
        // create a sample item
        name: 'Blue Shirt',        
        category: 'Clothing',      
        color: 'Blue',             
        size: 'M',                 
        material: 'Cotton',        
        description: 'Comfortable blue shirt' 
    };

    // define filters
    const filters = { query: 'blue', category: '', color: '', size: '', material: '' }; 
    // it should return true because "blue" is in name
    expect(matchesFilters(item, filters)).toBe(true); 
});

// test that matchesFilters returns false when the item does NOT match the query
test('matchesFilters returns false if item does not match query', () => 
{
    const item = { name: 'Red Shirt', category: 'Clothing', color: 'Red', size: 'M', material: 'Cotton', description: '' };
    // query is blue
    const filters = { query: 'blue', category: '', color: '', size: '', material: '' }; 
    // should return false because blue is not in name
    expect(matchesFilters(item, filters)).toBe(false); 
});

// test getFilters function
// test that getFilters collects values from DOM elements correctly
test('getFilters collects filter values safely', () => 
{
    // create fake HTML elements 
    document.body.innerHTML = `
        <input id="searchBar" value="shirt"> 
        <select id="filterCategory"><option value="Clothing" selected>Clothing</option></select>
        <select id="filterColor"><option value="Blue" selected>Blue</option></select>
    `;

    // call getFilters and pass the DOM elements
    const filters = getFilters(
        document.getElementById('searchBar'),       
        document.getElementById('filterCategory'), 
        document.getElementById('filterColor'),    
        // size select (none)
        null,                         
        // material select (none)             
        null                                       
    );

    // check that the filters object has the correct values
    expect(filters.query).toBe('shirt');       
    expect(filters.category).toBe('Clothing'); 
    expect(filters.color).toBe('Blue');        
    expect(filters.size).toBe('');             
    expect(filters.material).toBe('');         
});

// test saving multiple items and filtering
// test saving multiple items and filtering them
test('save multiple items and filter using matchesFilters', () => 
{
    // create two sample items
    const items = [
        { name: 'Blue Shirt', category: 'Clothing', color: 'Blue', size: 'M', material: 'Cotton', description: '' },
        { name: 'Red Shirt', category: 'Clothing', color: 'Red', size: 'L', material: 'Polyester', description: '' }
    ]; 

    // save the items to localStorage
    saveCatalog(items);    
    // load them back             
    const loaded = loadCatalog();       
    // make sure both items were saved
    expect(loaded.length).toBe(2);      

    // filter by "red"
    const filters = { query: 'red', category: '', color: '', size: '', material: '' }; 
    // filter items
    const matchedItems = loaded.filter(item => matchesFilters(item, filters)); 
    // only one item should match
    expect(matchedItems.length).toBe(1);        
    // check that the matched item is the correct one
    expect(matchedItems[0].name).toBe('Red Shirt'); 
});
