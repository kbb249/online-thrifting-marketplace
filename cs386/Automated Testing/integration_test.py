import requests

BASE_URL = "https://linkuthrifting.com"

def test_full_userinterface():
    session = requests.Session()
    #Sign up
    signup = session.post(f"{BASE_URL}/registerAcc.php", data=
    {
        "username": "integration1",
        "email": "integration1@email.com",
        "password": "integration",
        "confirm_password": "integration"
    }, allow_redirects= True)
    assert signup.status_code == 200
    assert "email verification" in signup.text.lower()
    #login
    login = session.post(f"{BASE_URL}/login.php", data=
    {
        "username": "integration1",
        "password": "integration"
    }, allow_redirects=False)
    assert login.status_code in (200, 301, 302)
    assert login.headers.get("Location", "").endswith("linku-catalog.php")
    #additem
    add_item = session.post(f"{BASE_URL}/addItem.php", data=
    {
        "item_name": "Integration Test",
        "category": "Shirts",
        "color": "Red",
        "size": "M",
        "material": "Cotton",
        "description": "Integration test",
        "price": 12.99
    }, allow_redirects=False)
    assert add_item.status_code in (200, 301, 302)
    assert add_item.headers.get("Location", "").endswith("linku-catalog.php")
    #check if it worked
    catalog = catalog_res = session.get(f"{BASE_URL}/linku-catalog.php")
    assert "Integration Test" in catalog.text
    
