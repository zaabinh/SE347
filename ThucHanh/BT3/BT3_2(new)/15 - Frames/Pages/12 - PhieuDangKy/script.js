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
    if (missing) error = `Please enter ${label}`;
    else if (control.validity.typeMismatch) error = `Please enter a valid ${label}`;
    else if (control.validity.patternMismatch) error = "Please enter a 10-digit phone number";
    else if (control.validity.rangeUnderflow) error = `Please enter a value of at least ${control.min}`;
    else if (!control.validity.valid) error = `Please enter a valid ${label}`;
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
    const invalid = fields.filter(field => !validateField(field));
    if (invalid.length) {
        // Focus also scrolls the first missing/invalid input into view.
        invalid[0].control.focus();
        return;
    }

    const query = new URLSearchParams(new FormData(form)).toString();
    history.pushState(null, "", "?" + query);
    message.textContent = "Phiếu đăng ký của bạn đã được gửi đi";
});

form.addEventListener("reset", () => {
    fields.forEach(field => showError(field));
    message.textContent = "";
    history.replaceState(null, "", location.pathname);
});
