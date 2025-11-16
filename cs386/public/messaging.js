//
const messageInput = document.getElementById('messageInput');
const chat = document.getElementById('chat');

//sends user message
function sendMessage() {
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
    messageInput.value = ''; //clear input
}

messageInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { 
        sendMessage();
    }
});