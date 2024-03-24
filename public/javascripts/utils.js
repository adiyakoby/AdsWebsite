'use strict';

const utils = (function () {
    /**
     * Creates a toast notification body.
     * @param {string} header - The header text for the toast notification.
     * @param {string} msg - The message text for the toast notification.
     * @returns {string} - The HTML string for the toast body.
     */
    const toastBodyCreator = (header, msg) => {
        const success = header.toLowerCase() === "approved" || header.toLowerCase() === "deleted";
        const colorClass = success ? 'bg-success' : 'bg-danger';
        const iconClass = success ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill';

        return `
        <div class="toast-header ${colorClass} text-white">
            <i class="${iconClass} me-2"></i>
            <strong class="me-auto">${header}!</strong>
            <small class="text-muted">Now</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${msg}
        </div>
    `;
    };

    /**
     * Displays a toast notification with the specified header and message.
     * @param {string} header - The header text for the toast notification.
     * @param {string} msg - The message text for the toast notification.
     */
    const showToast = (toastLive, header, msg) => {
        toastLive.innerHTML = toastBodyCreator(header, msg);

        const toastInstance = new bootstrap.Toast(toastLive, {
            animation: true,
            delay: 3000 // Adjust the delay as needed
        });

        toastInstance.show();
    }

    /**
     * Creates a button element with specified text, class, and event listener.
     * @param {string} text - The text content of the button.
     * @param {string} className - The class name(s) to apply to the button.
     * @param {string} dataId - The ID or data attribute value for the button.
     * @param {Function} eventListener - The event listener function for the button click event.
     * @returns {HTMLElement} - The button element.
     */
    const createButton = function (text, className, dataId, eventListener) {
        const button = document.createElement('button');
        button.classList.add('btn', className, 'me-2', 'col-3', 'fs-5');
        button.textContent = text;
        button.setAttribute('data-ad-id', dataId);
        button.addEventListener('click', eventListener);
        return button;
    }


    /**
     * Creates a list item for displaying ad details.
     * @param {string} label - The label for the ad detail.
     * @param {string} value - The value of the ad detail.
     * @returns {HTMLElement} - The list item element.
     */
    const createListItem = function (label, value) {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'border-0', 'py-1');
        listItem.innerHTML = `<strong>${label}:</strong> ${value}`;
        return listItem;
    }

    /**
     * Generates HTML template for displaying a message when no ads are available.
     * @returns {string} - The HTML template for the message.
     */
    function generateNoAdsTemplate() {
        return `
        <div class="container mt-5">
            <div class="row">
                <div class="col-lg-6 mx-auto">
                    <div class="card rounded shadow-lg">
                        <div class="card-body">
                            <h2 class="card-title text-primary mb-4">No Ads Available</h2>
                            <p class="card-text text-muted">Oops! It seems there are no ads to display at the moment.</p>
                            <p class="card-text text-muted">Don't worry, new ads are added all the time. Please check back later for updates.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    }

    /**
     * Fetches data from the server using the specified URL and method.
     * @param {string} url - The URL to fetch data from.
     * @param {string} [method=GET] - The HTTP method to use for the request (default is GET).
     * @returns {Promise<Response>} - The response from the server.
     */
    const fetchData = async function (url, method) {
        try {
            const response = await fetch(url, { method: method || "GET" });
            if (!response.ok)
                throw new Error(response.statusText);
            return response;
        } catch (err) {
            throw err;
        }
    }




    return {
        showToast: showToast,
        createButton: createButton,
        createListItem: createListItem,
        generateNoAdsTemplate: generateNoAdsTemplate,
        fetchData: fetchData,

    }
})();