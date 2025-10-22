document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const confirmpassInp = document.getElementById("confirm_password");
    const responseMessage = document.getElementById('passwordError');
    form.addEventListener('submit', function(event)
    {
        //prevent refreshes
        event.preventDefault();

        //password check
        if (passwordInput.value !== confirmpassInp.value)
        {
            event.preventDefault();
            responseMessage.textContent = "Passwords do not match.";
            return;
        }

        if(passwordInput.value < 8)
        {
            event.preventDefault();
            passwordInput.textContent = "Password too short. Please use at least 8 characters.";
            passwordInput.focus();
            return;
        }

        //clear messages
        responseMessage.textContent = '';

        const formData = new FormData(form);
    })
})
