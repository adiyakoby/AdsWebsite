'use strict';

(function () {
    // DOM elements
    const adsContainer = document.getElementById("ads-container");
    const spinner = document.getElementById("spinner-loader");
    const approvedAdsBtn = document.getElementById("approved-ads");
    const pendingAdsBtn = document.getElementById("pending-ads");
    const toastLive = document.getElementById('liveToast');

    // Messages
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
     * Retrieves ads of a specific type (pending or approved) from the server and updates the UI.
     * @param {string} adType - The type of ads to retrieve (pending or approved).
     */
    const getAds = async function (adType) {
        const res = await utils.fetchData(`/api/${adType}Ads`);
        const ads = await res.json();
        if(ads.length !== 0) {
            adsContainer.innerHTML = '';
            ads.forEach(ad => adsContainer.appendChild(utils.createCustomCard(ad, adType, {approveAd:approveAd,deleteAd: deleteAd})));
        }
        else {
            adsContainer.innerHTML = utils.generateNoAdsTemplate();
        }

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

        const listItemPrice = utils.createListItem('Price', ad.price);
        const listItemPhone = utils.createListItem('Phone Number', ad.phone);
        const listItemEmail = utils.createListItem('Email', ad.email);
        const cardFooterDiv = document.createElement('div');
        cardFooterDiv.classList.add('card-footer', 'text-muted');

        const smallText = document.createElement('small');
        smallText.textContent = `Last updated ${Math.floor((new Date() - new Date(ad.createdAt)) / (1000 * 60))} mins ago`;


        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('d-flex', 'justify-content-center');

        // Create approve button if adType is pending
        if (adType === 'pending') {
            const buttonV = utils.createButton('V', 'btn-success', ad.id, approveAd);
            buttonGroup.appendChild(buttonV);
        }

        // Create delete button
        const buttonX = utils.createButton('X', 'btn-danger', ad.id, deleteAd);
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
     * Handles the approval of an ad.
     * @param {Event} btn - The click event object of the button clicked.
     */
    const approveAd = async function (btn) {
        try {
            const res = await utils.fetchData(`/api/ads/${btn.srcElement.dataset.adId}`, "PUT");
            utils.showToast(toastLive, "approved", await res.text())
        } catch (e) {
            utils.showToast(toastLive, adErrorMessage, e.message);
        } finally {
            await fetchAds('pending');
        }
    }

    /**
     * Handles the deletion of an ad.
     * @param {Event} btn - The click event object of the button clicked.
     */
    const deleteAd = async function (btn) {
        try {
            const res = await utils.fetchData(`/api/ads/${btn.srcElement.dataset.adId}`, "DELETE");
            utils.showToast(toastLive, "deleted", await res.text())
        } catch (e) {
            utils.showToast(toastLive, adErrorMessage, e.message);
        } finally {
            const adType = pendingAdsBtn.classList.contains('btn-primary') ? 'pending' : 'approved';
            await fetchAds(adType);
        }
    }





})();