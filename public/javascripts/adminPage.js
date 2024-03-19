'use strict';

(function () {
    // DOM elements
    const adsContainer = document.getElementById("ads-container");
    const spinner = document.getElementById("spinner-loader");
    const approvedAdsBtn = document.getElementById("approved-ads");
    const pendingAdsBtn = document.getElementById("pending-ads");
    const toastLive = document.getElementById('liveToast')

    // Messages
    const adApprovedMessage = "Ad was approved successfully.";
    const adDeletedMessage = "Ad was deleted successfully.";
    const adErrorMessage = "Something went wrong, please try again."


    /**
     * Event listener to ensure DOM content is fully loaded
     */
    document.addEventListener('DOMContentLoaded', async function () {

        await fetchAds('pending');

        // Event listeners for switching between pending and approved ads
        approvedAdsBtn.addEventListener('click', async function () {
            pendingAdsBtn.classList = 'btn btn-secondary btn-lg col-4';
            approvedAdsBtn.classList = 'btn btn-primary btn-lg col-4';
            await fetchAds('approved');
        });

        pendingAdsBtn.addEventListener('click',async function () {
            approvedAdsBtn.classList = 'btn btn-secondary btn-lg col-4';
            pendingAdsBtn.classList = 'btn btn-primary btn-lg col-4';
            await fetchAds('pending');
        });


    });


    /**
     * Fetches ads based on their type (pending or approved) from the server.
     * @param {string} adsType - The type of ads to fetch (pending or approved).
     */
    async function fetchAds(adsType) {

        spinner.classList.remove('d-none');
        try {
            await getAds(adsType);
            spinner.classList.add('d-none');
        } catch (err) {
            console.log('Error message:', err);
        } finally {
            spinner.classList.add('d-none');
        }
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
            console.log('Error message:', err);
            throw err;
        }
    }

    /**
     * Retrieves ads of a specific type (pending or approved) from the server and updates the UI.
     * @param {string} adType - The type of ads to retrieve (pending or approved).
     */
    const getAds = async function (adType) {
        const res = await fetchData(`/${adType}Ads`);
        const ads = await res.json();

        if(ads.length !== 0) {
            adsContainer.innerHTML = '';
            ads.forEach(ad => adsContainer.appendChild(createCustomCard(ad, adType)));
        }
        else {
            adsContainer.innerHTML = generateNoAdsTemplate(adType);
        }

    }

    /**
     * Generates HTML template for displaying a message when no ads are available.
     * @param {string} adType - The type of ads for which the message is generated.
     * @returns {string} - The HTML template for the message.
     */
    function generateNoAdsTemplate(adType) {
        return `
        <div class="container mt-5">
            <div class="row">
                <div class="col-lg-6 mx-auto">
                    <div class="card rounded shadow-lg">
                        <div class="card-body">
                            <h2 class="card-title text-primary mb-4">No Ads Available</h2>
                            <p class="card-text text-muted">Oops! It seems there are no ${adType} ads to display at the moment.</p>
                            <p class="card-text text-muted">Don't worry, new ads are added all the time. Please check back later for updates.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    }

    /**
     * Creates a custom card element to display an ad with options to approve or delete.
     * @param {Object} ad - The ad object containing information like title, description, etc.
     * @param {string} adType - The type of ad (pending or approved).
     * @returns {HTMLElement} - The custom card element representing the ad.
     */
    const createCustomCard = function (ad, adType) {

        const colDiv = document.createElement('div');
        colDiv.classList.add('col', 'mb-4');

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'h-100', 'border-0', 'shadow');

        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title', 'mb-3');
        cardTitle.textContent = ad.title;

        const cardText = document.createElement('p');
        cardText.classList.add('card-text', 'mb-4');
        cardText.textContent = ad.description;

        const listGroup = document.createElement('ul');
        listGroup.classList.add('list-group', 'list-group-flush');

        const listItemPrice = createListItem('Price', ad.price);
        const listItemPhone = createListItem('Phone Number', ad.phone);
        const listItemEmail = createListItem('Email', ad.email);
        const cardFooterDiv = document.createElement('div');
        cardFooterDiv.classList.add('card-footer', 'text-muted');

        const smallText = document.createElement('small');
        smallText.textContent = `Last updated ${Math.floor((new Date() - new Date(ad.createdAt)) / (1000 * 60))} mins ago`;


        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('d-flex', 'justify-content-center');

        // Create approve button if adType is pending
        if (adType === 'pending') {
            const buttonV = createButton('V', 'btn-success', ad.id, approveAd);
            buttonGroup.appendChild(buttonV);
        }

        // Create delete button
        const buttonX = createButton('X', 'btn-danger', ad.id, deleteAd);
        buttonGroup.appendChild(buttonX);

        // Append elements to card
        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardText);
        listGroup.appendChild(listItemPrice);
        if (ad.phone) listGroup.appendChild(listItemPhone);
        listGroup.appendChild(listItemEmail);

        cardFooterDiv.appendChild(smallText);

        colDiv.appendChild(cardDiv);
        cardDiv.appendChild(cardBodyDiv);
        cardDiv.appendChild(listGroup);
        cardDiv.appendChild(cardFooterDiv);
        cardDiv.appendChild(buttonGroup);

        return colDiv;
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
     * Handles the approval of an ad.
     * @param {Event} btn - The click event object of the button clicked.
     */
    const approveAd = async function (btn) {
        const res = await fetchData(`/ads/${btn.srcElement.dataset.adId}`, "PUT");
        if(res.ok) {
            await fetchAds('pending');
            showToast("approved", adApprovedMessage)
        } else {
            showToast("", adErrorMessage);
        }

    }

    /**
     * Handles the deletion of an ad.
     * @param {Event} btn - The click event object of the button clicked.
     */
    const deleteAd = async function (btn) {
        const res = await fetchData(`/ads/${btn.srcElement.dataset.adId}`, "DELETE");
        if(res.ok) {
            const adType = pendingAdsBtn.classList.contains('btn-primary') ? 'pending' : 'approved';
            await fetchAds(adType);
            showToast("deleted", adDeletedMessage)
        } else {
            showToast("", adErrorMessage);
        }


    }
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
    const showToast = (header, msg) => {
        toastLive.innerHTML = toastBodyCreator(header, msg);

        const toastInstance = new bootstrap.Toast(toastLive, {
            animation: true,
            delay: 3000 // Adjust the delay as needed
        });

        toastInstance.show();
    };


})();