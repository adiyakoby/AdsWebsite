'use strict';

(function () {
    // DOM elements
    const titleElement = document.getElementById("title");
    const descriptionElement = document.getElementById("description");
    const priceElement = document.getElementById("price");
    const emailElement = document.getElementById("email");
    const phoneElement = document.getElementById("phone");

    // Error messages
    const titleErrorMessage = 'Title cannot be empty and must exceed 20 characters.';
    const descriptionErrorMessage = 'Description must not exceed 200 characters.';
    const priceErrorMessage = 'Price must be a valid number greater than 0.';
    const emailErrorMessage = 'Email must be in a valid format.';
    const phoneErrorMessage = 'Phone number must be in the format XXX-XXXXXXX or XX-XXXXXXX.';

    /**
     * Event listener to ensure DOM content is fully loaded
     */
    document.addEventListener('DOMContentLoaded',  function () {

        titleElement.addEventListener('change', validateTitle);
        descriptionElement.addEventListener('change', validateDescription);
        priceElement.addEventListener('change', validatePrice);
        emailElement.addEventListener('change', validateEmail);
        phoneElement.addEventListener('change', validatePhone);

    }); // end of DOMContentLoaded listener


    /**
     * Validates the title input field.
     */
    function validateTitle() {
        const titleValue = titleElement.value.trim();
        const titleLength = titleValue.length;

        if (titleLength === 0 || titleLength > 20) {
            showError(titleElement, titleErrorMessage);
        } else {
            resetError(titleElement);
        }
    }

    /**
     * Validates the description input field.
     */
    function validateDescription() {
        const descriptionValue = descriptionElement.value.trim();
        const descriptionLength = descriptionValue.length;

        if (descriptionLength > 200) {
            showError(descriptionElement, descriptionErrorMessage);
        } else {
            resetError(descriptionElement);
        }
    }

    /**
     * Validates the price input field.
     */
    function validatePrice() {
        const priceValue = parseFloat(priceElement.value);

        if (isNaN(priceValue) || priceValue <= 0) {
            showError(priceElement, priceErrorMessage);
        } else {
            resetError(priceElement);
        }
    }

    /**
     * Validates the email input field.
     */
    function validateEmail() {
        const emailValue = emailElement.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {
            showError(emailElement, emailErrorMessage);
        } else {
            resetError(emailElement);
        }
    }

    /**
     * Validates the phone number input field.
     */
    function validatePhone() {
        const phoneValue = phoneElement.value.trim();
        const phonePattern = /^(\d{2,3}-\d{7})?$/;

        if (!phonePattern.test(phoneValue)) {
            showError(phoneElement, phoneErrorMessage);
        } else {
            resetError(phoneElement);
        }
    }

    /**
     * Resets error messages for the given input element.
     * @param {Element} element - The input element to reset errors for
     */
    function resetError(element) {
        element.classList.remove("is-invalid");
        element.nextElementSibling.textContent = '';
    }

    /**
     * Displays an error message for the given input element.
     * @param {HTMLElement} element - The input element.
     * @param {string} message - The error message to display.
     */
    function showError(element, message) {
        element.classList.add("is-invalid");
        element.nextElementSibling.textContent = message;

    }

})();