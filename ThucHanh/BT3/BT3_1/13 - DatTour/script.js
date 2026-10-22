const form = document.getElementById("register-form");
const successDialog = document.getElementById("success-dialog");
document.getElementById("close-dialog").addEventListener("click", () => {
    successDialog.close();
});
window.addEventListener("click", () => {
    successDialog.close();
});

form.noValidate = true;
const fields = [...form.querySelectorAll(".field")].
map(wrapper => {
    const control = wrapper.querySelector("input, select, textarea");
    const label = wrapper.dataset.label || control.labels[0].textContent.trim();
    const error = document.createElement("p");
    error.id = `${control.id}-error`;
    error.className = "field-error";
    error.hidden = true;
    wrapper.append(error);
    return { wrapper, control, label, error };
});

// Toggle error message function
function showError(field, text= "") {
    const {wrapper, error} = field;
    error.textContent = text;
    // If text is none, hide the error component
    error.hidden = !text;
    // !! change text to boolean without change its correctness
    wrapper.classList.toggle("has-error", !!text);
    wrapper.querySelectorAll("input, select, textarea").forEach(control => {
        if(text) {
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
    const missing = control.validity.valueMissing || (control.required && control.type === "text"&& !control.value.trim());
    let error = "";
    if (missing) {
        if (label === "Phương tiện") error = `Vui lòng chọn phương tiện`;
        else if (label === "Điện thoại") error = `Vui lòng nhập số điện thoại`;
        else {
            error = `Vui lòng nhập ${label.toString().toLowerCase()}`;
        }
    }
    else if (control.validity.typeMismatch) error = `${label} không hợp lệ`;
    else if (control.validity.patternMismatch) error = "Vui lòng nhập số điện thoại có 10 chữ số";
    else if(control.validity.rangeUnderflow) error = `Giá trị nhỏ nhất là ${control.min}`;
    else if(!control.validity.valid) error = `${label} không hợp lệ`;
    showError(field, error);
    return !error;
}

fields.forEach(field => {
    ["input", "change"].forEach(type => field.wrapper.addEventListener(type, () => {
        if(field.wrapper.classList.contains("has-error")) validateField(field);
    }));
});

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const invalid = fields.filter(field => !validateField(field));
    if (invalid.length) {
        invalid[0].control.focus();
        return;
    }

    const data = new FormData(form);
    const query = new URLSearchParams(data.toString());
    history.pushState(null, "", "?" + query);
    const result = document.getElementById("register-result");
    const details = [
        ["Họ tên", data.get("fullname")],
        ["Địa chỉ", data.get("address")],
        ["Điện thoại", data.get("tel")],
        ["Khách Việt Nam", data.has("vietnamese") ? "Có" : "Không"],
        ["Tour", form.elements.tour.selectedOptions[0].textContent],
        ["Phương tiện", data.get("transport")],
        ["Số lượng người lớn", data.get("adults")],
        ["Số lượng trẻ em", data.get("children")],
        ["Ghi chú", data.get("note") || "Không có"]
    ];
    result.replaceChildren();
    details.forEach(([label, value]) => {
        const row = document.createElement("p");
        const heading = document.createElement("strong");
        heading.textContent = `${label}: `;
        row.append(heading, document.createTextNode(value ?? ""));
        result.append(row);
    })
    successDialog.showModal();
});

// Editing again hides the old message, so it animates in again on the next submit
form.addEventListener("input", function() {
});
