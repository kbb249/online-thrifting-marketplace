//
const messageInput = document.getElementById('messageInput');
const chat = document.getElementById('chat');

//sends user message
async function sendMessage() {
    const message = messageInput.value.trim();
    if (message != '') { //does not send if message is empty
        //creates message box
        const messageBox = document.createElement('div');
        messageBox.classList.add('col-10', 'offset-1');
        //creates message text
        const messageText = document.createElement('p');
        messageText.classList.add('form-control', 'mb-4');
        messageText.innerHTML = message;
        messageBox.appendChild(messageText);
        //attaches message to the chat
        chat.appendChild(messageBox);
    }
    messageInput.value = '';
    // const message = messageInput.value.trim();
    // if (!message) return;
    // const response = await fetch("/cs386/api/messages/sendMessages.php", {
    //     method: "POST",
    //     body: new URLSearchParams({
    //         message: message,
    //         conversation_id: CURRENT_CONVERSATION_ID
    //     })
    // });

    // if (response.ok) {
    //     appendMessage(message, "sent");
    //     messageInput.value = "";
    // }
    // else if (!response.ok) {
    //     console.error("Send failed:", await response.text());
    // }
}

function appendMessage(text, type) {
    const msgContainer = document.createElement("div");
    msgContainer.classList.add("col-10", "offset-1");
    const msg = document.createElement("p");
    msg.classList.add("form-control", "mb-3");
    msg.textContent = text;

    if (type === "sent") msg.style.background = "lightblue";
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
        sendMessage();
    }
});