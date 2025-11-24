//testing sendMessage and htmlEscape to prevent malicious/script breaking messages
const { sendMessage, htmlEscape } = require("./messaging.js");

describe("Messaging tests", () => {

    beforeEach(() => {
        // Simulated DOM
        document.body.innerHTML = `
            <input id="messageInput" />
            <div id="chat"></div>
        `;
    });

    test("sendMessage should append a message", async () => {
        const messageInput = document.getElementById("messageInput");
        const chat = document.getElementById("chat");

        messageInput.value = "Hello world";
        await sendMessage();

        const messages = chat.querySelectorAll("p");
        expect(messages.length).toBe(1);
        expect(messages[0].innerHTML).toBe("Hello world");
    });

    test("sendMessage should ignore empty messages", async () => {
        const chat = document.getElementById("chat");

        document.getElementById("messageInput").value = "   ";
        await sendMessage();

        expect(chat.children.length).toBe(0);
    });

    test("htmlEscape should escape special characters", () => {
        const result = htmlEscape(`<script>alert("x")</script>`);
        expect(result).toBe("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;");
    });

});