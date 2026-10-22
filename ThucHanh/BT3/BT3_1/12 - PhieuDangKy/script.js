const form = document.getElementById("register-form");
const message = document.getElementById("message");

// Replace browser popups with inline errors. Without JS, native validation still works.
form.noValidate = true;
const fields = [...form.querySelectorAll(".field")].map(wrapper => {
    const control = wrapper.querySelector("input, select, textarea");
    const label = wrapper.dataset.label || control.labels[0].textContent.trim();
    const error = document.createElement("p");
    error.id = `${control.id}-error`;
    error.className = "field-error";
    error.hidden = true;
    wrapper.append(error);
    return { wrapper, control, label, error };
});

function showError(field, text = "") {
    const { wrapper, error } = field;
    error.textContent = text;
    error.hidden = !text;
    wrapper.classList.toggle("has-error", !!text);
    // Describe the error for every radio in a group, as well as ordinary inputs.
    wrapper.querySelectorAll("input, select, textarea").forEach(control => {
        if (text) {
            control.setAttribute("aria-invalid", "true");
            control.setAttribute("aria-describedby", error.id);
        } else {
            control.removeAttribute("aria-invalid");
            control.removeAttribute("aria-describedby");
        }
    });
}

function validateField(field) {
    const { control, label } = field;
    const missing = control.validity.valueMissing ||
        (control.required && control.type === "text" && !control.value.trim());
    let error = "";
    if (missing) error = `Vui lòng nhập ${label}`;
    else if (control.validity.typeMismatch) error = `${label} không hợp lệ`;
    else if (control.validity.patternMismatch) error = "Vui lòng nhập số điện thoại có 10 chữ số";
    else if (control.validity.rangeUnderflow) error = `Giá trị nhỏ nhất là ${control.min}`;
    else if (!control.validity.valid) error = `${label} không hợp lệ`;
    showError(field, error);
    return !error;
}

// Recheck only fields already marked invalid, so untouched fields stay quiet.
fields.forEach(field => {
    ["input", "change"].forEach(type => field.wrapper.addEventListener(type, () => {
        message.textContent = "";
        if (field.wrapper.classList.contains("has-error")) validateField(field);
    }));
});

form.addEventListener("submit", event => {
    event.preventDefault();
    message.textContent = "";
    // Check every fields validation
    const invalid = fields.filter(field => !validateField(field));
    if (invalid.length) {
        // Focus also scrolls the first missing/invalid input into view.
        invalid[0].control.focus();
        return;
    }

    // Add input values to URL bar
    const query = new URLSearchParams(new FormData(form)).toString();
    history.pushState(null, "", "?" + query);

    // Notice send successfully
    message.textContent = "Phiếu đăng ký của bạn đã được gửi đi";
});

form.addEventListener("reset", () => {
    fields.forEach(field => showError(field));
    message.textContent = "";
    fields[0].control.focus();
    history.replaceState(null, "", location.pathname);
});
