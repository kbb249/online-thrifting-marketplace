//
const messageInput = document.getElementById('messageInput');
const chat = document.getElementById('chat');

//sends user message
async function sendMessage() {
    const message = messageInput.value.trim();
    message = htmlEscape(message);

    if (!message) return;
        const response = await fetch("/cs386/api/messages/sendMessages.php", {
            method: "POST",
            body: new URLSearchParams({
                message: message,
                conversation_id: CURRENT_CONVERSATION_ID
            })
        });

        if (response.ok) {
            appendMessage(message);
            messageInput.value = "";
        }
        else if (!response.ok) {
            console.error("Send failed:", await response.text());
        }
}

function appendMessage(text) {
    //creates message box
    const msgContainer = document.createElement("div");
    msgContainer.classList.add("col-10", "offset-1");
    //creates message text
    const msg = document.createElement("p");
    msg.classList.add("form-control", 'mb-4', 'sent');
    msg.textContent = text;
    //attaches message to the chat
    msgContainer.appendChild(msg);
    chat.appendChild(msgContainer);
}

setInterval(async () => {
    const res = await fetch(`/api/messages/fetchConversation.php?conversation_id=${CURRENT_CONVERSATION_ID}`);
    const messages = await res.json();
    chat.innerHTML = "";
    messages.forEach(m => appendMessage(m.message, m.sender_id === USER_ID ? "sent" : "received"));
}, 1500);

function htmlEscape(str) {
return String(str).replace(/[&<>\"']/g, function(s) { 
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[s]); });
}

messageInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { 
        const message = messageInput.value.trim();
        messageInput.value = '';
        appendMessage(message);
    }
});