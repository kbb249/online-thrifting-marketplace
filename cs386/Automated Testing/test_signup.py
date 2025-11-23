import requests

BASE_URL = "http://linkuthrifting.com"
SIGNUP_URL = f"{BASE_URL}/registerAcc.php"

def test_signup():
    session = requests.Session()
    res = session.post(SIGNUP_URL, data=
    {
        "username": "vanilla",
        "email": "vanilla@email.com",
        "password": "userpass",
        "confirm_password": "userpass",
    }, allow_redirects=False)

    assert res.status_code in (301,302)
    assert "registerAcc.php" in res.headers["Location"]

def test_existing_username():
    session = requests.Session()
    res = session.post(SIGNUP_URL, data=
    {
        "username": "henrytest",
        "email": "fake@email.com",
        "password": "pass",
        "confirm_password": "pass"
    }, allow_redirects=False)

    assert res.status_code in (200, 301, 302)
def test_password_mismatch():
    session = requests.Session()
    res = session.post(SIGNUP_URL, data=
    {
        "username": "mismatchpass",
        "email": "fake@email.com",
        "password": "pass123",
        "confirm_password": "pass345"
    }, allow_redirects=False)

    assert res.status_code in (200, 301,302)
