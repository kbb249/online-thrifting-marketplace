import requests

BASE_URL = "https://linkuthrifting.com/"
LOGIN_URL = f"{BASE_URL}/login.php"

def test_login():
    session = requests.Session()
    res = session.post(LOGIN_URL, data =
    {
        "username":"henrytest",
        "password": "henrytest"
    }, allow_redirects=False)  
    assert res.status_code == 302
    assert "linku-catalog.php" in res.headers["Location"]

def test_wrong_password():
    session = requests.Session()
    res = session.post(LOGIN_URL, data=
    {
        "username": "henrytest",
        "password": "henry"
    }, allow_redirects=False)

    assert res.status_code == 302
    assert "linku-login.html?error=Incorrect+password" in res.headers["Location"]

def test_nonexistent_user():
    session = requests.Session()
    res = session.post(LOGIN_URL, data=
    {
        "username": "DNE_USER",
        "password": "test"
    }, allow_redirects=False)

    assert res.status_code == 302
    assert "linku-login.html?error=Username+not+found" in res.headers["Location"]

def test_login_empty_fields():
    session = requests.Session()
    res = session.post(LOGIN_URL, data=
    {
        "username": "",
        "password": ""
    }, allow_redirects=False)

    assert res.status_code == 302
    assert "linku-login.html" in res.headers["Location"]
