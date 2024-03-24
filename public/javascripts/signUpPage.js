'use strict';

(function () {
    // DOM elements
    const userNameElement = document.getElementById("username");
    const passwordNameElement = document.getElementById("password");


    // Error messages
    const usernameError = 'username must contain only letters and numbers and be between 3-20 chars.';
    const passwordError = 'password must be between 4-20 chars.';

    /*
     * Event listener to ensure DOM content is fully loaded
     */
    document.addEventListener('DOMContentLoaded', async function () {
        userNameElement.addEventListener('change', validateUsername);
        passwordNameElement.addEventListener('change', validatePassword);

    });

    /**
     * Validates the username input field. (len 3-20)
     */
    const validateUsername = function () {
        const username = userNameElement.value.trim();
        if(username.length < 3 || username.length > 20) {
            utils.showError(userNameElement, usernameError);
        } else {
            utils.resetError(userNameElement);
        }
    }

    /**
     * Validates the password field. (len 4-20)
     */
    const validatePassword = function () {
        const password = passwordNameElement.value.trim();
        if(password.length < 4 || password.length > 20) {
            utils.showError(passwordNameElement, passwordError);
        } else {
            utils.resetError(passwordNameElement);
        }
    }



})();