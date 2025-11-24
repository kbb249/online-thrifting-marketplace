import pytest
from playwright.sync_api import sync_playwright

BASE_URL = "https://linkuthrifting.com" 

def test_edit_listing():

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto(f"{BASE_URL}/linku-login.html")

        page.fill("input[name='username']", "henrytest")     
        page.fill("input[name='password']", "henrytest")   
        page.click("button[type='submit']")

        page.wait_for_url(f"{BASE_URL}/linku-catalog.php")

        assert "Catalog" in page.title()
        page.click("#profiledropdown")
        page.click("#myListings")
        page.click(".edit-btn")
        page.wait_for_url(f"{BASE_URL}/myListings.php")
        page.wait_for_selector("#editModal.show")

        page.fill("#editName", "Updated")
        page.fill("#editPrice", "11.99")
        page.fill("#editDesc", "This is updated by an automated test.")
        page.click("#saveEditBtn")
        page.reload()
        updated_form = page.locator(".listing h3").first.inner_text()
        assert updated_form == "Updated"
        browser.close()
