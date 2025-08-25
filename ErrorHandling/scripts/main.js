import { all_input } from './elements.js';
import { getUserData } from './formData.js';


const form = document.querySelector(".needs-validation");
const fieldPhone = document.querySelector("input[name=phone]");

Inputmask({"mask" : "+7 (999) 999-99-99", showMaskOnHover: false}).mask(fieldPhone);

form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    all_input.forEach(input => {
        input.classList.remove("is-invalid");
        if (input.nextElementSibling && input.nextElementSibling.classList.contains("invalid-feedback")) {
            input.nextElementSibling.remove();
        }
    });

    try {
        let user = getUserData();
    } catch (error) {
        console.log(error.name);
    }
},
false
);