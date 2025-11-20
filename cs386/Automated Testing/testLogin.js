// Mock responses you expect from login.php
const mockServer = {
    correct: {
        status: "success",
        redirect: "linku-catalog.html"
    },
    wrongPassword: {
        status: "error",
        message: "Incorrect password"
    },
    notFound: {
        status: "error",
        message: "Username not found"
    }
};

// Replace the real fetch() with a mock one
async function mockFetch(url, options) {
    const formData = new URLSearchParams(options.body);
    const username = formData.get("username");
    const password = formData.get("password");

    // Test conditions (you control these)
    if (username === "alice" && password === "correctpass") {
        return { json: async () => mockServer.correct };
    }
    if (username === "alice" && password !== "correctpass") {
        return { json: async () => mockServer.wrongPassword };
    }
    return { json: async () => mockServer.notFound };
}

// Automated test runner
async function runLoginTest(username, password, expected) {
    const response = await mockFetch("login.php", {
        method: "POST",
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    });

    const result = await response.json();

    const passed = (
        result.status === expected.status &&
        (expected.message ? result.message === expected.message : true)
    );

    console.log(`Test: ${expected.description}`);
    console.log(passed ? "PASSED" : "FAILED");
    console.log("Response:", result);
    console.log("Expected:", expected);
    console.log("-------------------------");
}

// Define your test cases
async function runAllTests() {
    await runLoginTest("alice", "correctpass", {
        status: "success",
        description: "Correct username and password"
    });

    await runLoginTest("alice", "wrongpass", {
        status: "error",
        message: "Incorrect password",
        description: "Wrong password"
    });

    await runLoginTest("ghost", "whatever", {
        status: "error",
        message: "Username not found",
        description: "User does not exist"
    });
}

// Run automatically
runAllTests();
