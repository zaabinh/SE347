const form = document.querySelector(".login-form");
const message = document.getElementById("message");

// Show the greeting without actually sending the form
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.createElement("strong");
    name.textContent = form.username.value.trim(); // textContent: typed text is never run as HTML
    message.replaceChildren("Chào bạn ", name);
});
