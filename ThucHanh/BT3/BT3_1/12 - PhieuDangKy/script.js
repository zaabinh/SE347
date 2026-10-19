const form = document.getElementById("register-form");
const message = document.getElementById("message");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const query = new URLSearchParams(new FormData(form)).toString();
    history.pushState(null, "", "?" + query);

    message.textContent = "Phiếu đăng ký của bạn đã được gửi đi";
});

form.addEventListener("reset", function() {
    message.textContent = "";
    history.replaceState(null, "", location.pathname);
});
