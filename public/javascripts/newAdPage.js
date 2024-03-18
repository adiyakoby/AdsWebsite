'use strict';


(function () {
    const titleElement = document.getElementById("title");
    const titleErrorElement = document.getElementById("title-error");
    const descriptionElement = document.getElementById("description");
    const descriptionErrorElement = document.getElementById("description-error");
    const priceElement = document.getElementById("price");
    const priceErrorElement = document.getElementById("price-error");
    const emailElement = document.getElementById("email");
    const emailErrorElement = document.getElementById("email-error");
    const phoneElement = document.getElementById("phone");
    const phoneErrorElement = document.getElementById("phone-error");


    document.addEventListener('DOMContentLoaded',  function () {

        titleElement.addEventListener('change', validateTitle);
        descriptionElement.addEventListener('change', validateDescription);
        priceElement.addEventListener('change', validatePrice);
        emailElement.addEventListener('change', validateEmail);
        phoneElement.addEventListener('change', validatePhone);

    }); // end of DOMContentLoaded listener


    function validateTitle() {
        const titleValue = titleElement.value.trim();
        const titleLength = titleValue.length;

        if (titleLength === 0 || titleLength > 20) {
            titleElement.classList.add("is-invalid");
            titleErrorElement.textContent = 'Title cannot be empty and must exceed 20 characters.'
        } else {
            resetError(titleElement, titleErrorElement);
        }
    }

    function validateDescription() {
        const descriptionValue = descriptionElement.value.trim();
        const descriptionLength = descriptionValue.length;

        if (descriptionLength > 200) {
            descriptionElement.classList.add("is-invalid");
            descriptionErrorElement.textContent = 'Description must not exceed 200 characters.';
        } else {
            resetError(descriptionElement, descriptionErrorElement);
        }
    }

    function validatePrice() {
        const priceValue = parseFloat(priceElement.value);

        if (isNaN(priceValue) || priceValue <= 0) {
            priceElement.classList.add("is-invalid");
            priceErrorElement.textContent = 'Price must be a valid number greater than 0.';
        } else {
            resetError(priceElement, priceErrorElement);
        }
    }

    function validateEmail() {
        const emailValue = emailElement.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {
            emailElement.classList.add("is-invalid");
            emailErrorElement.textContent = 'Email must be in a valid format.';
        } else {
            resetError(emailElement, emailErrorElement);
        }
    }

    function validatePhone() {
        const phoneValue = phoneElement.value.trim();
        const phonePattern = /^(\d{2,3}-\d{7})?$/;

        if (!phonePattern.test(phoneValue)) {
            phoneElement.classList.add("is-invalid");
            phoneErrorElement.textContent = 'Phone number must be in the format XXX-XXXXXXX or XX-XXXXXXX.';
        } else {
            resetError(phoneElement, phoneErrorElement);
        }
    }

    function resetError(element, errorElement) {
        element.classList.remove("is-invalid");
        errorElement.textContent = '';
    }

})();