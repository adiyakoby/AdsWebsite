'use strict';


(function () {
    // DOM elements
    const adsContainer = document.getElementById("ads-container");
    const spinner = document.getElementById("spinner-loader");
    const toastLive = document.getElementById('liveToast');


    // Messages
    const adErrorMessage = "Something went wrong, please try again.";

    /**
     * Event listener to ensure DOM content is fully loaded
     */
    document.addEventListener('DOMContentLoaded', async function () {
        await fetchAds();

    });

    /**
     * Fetches all ads from the server.
     */
    async function fetchAds() {
        spinner.classList.remove('d-none');
        try {
            await getAds();
        } catch (err) {
            console.log('Error message:', err);
        } finally {
            spinner.classList.add('d-none');
        }
    }



    /**
     * Retrieves all ads from the server and updates the UI.
     */
    const getAds = async function () {
        const res = await utils.fetchData(`/api/userAds`);
        const ads = await res.json();
        if (ads.length !== 0) {
            adsContainer.innerHTML = '';
            ads.forEach(ad => adsContainer.appendChild(utils.createCustomCard(ad, 'user', {deleteAd: deleteAd})));
        } else {
            adsContainer.innerHTML = utils.generateNoAdsTemplate();
        }
    }

    const getAds2 = async function() {
        const userUrl = '/api/userAds';
        getAds(userUrl);


    }



    /**
     * Creates a custom card element to display an ad with options to approve or delete.
     * @param {Object} ad - The ad object containing information like title, description, etc.
     * @returns {HTMLElement} - The custom card element representing the ad.
     */
    const createCustomCard = function (ad) {

        const colDiv = document.createElement('div');
        colDiv.classList.add('col', 'mb-4');

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'h-100', 'border-0', 'shadow');
        cardDiv.id = ad.id; // save the ad id for later use of modification

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

        // Create delete button
        const buttonX = utils.createButton('X', 'btn-danger', ad.id, deleteAd);
        buttonGroup.appendChild(buttonX);

        // Add text to indicate if the ad is approved or not
        const isApprovedText = document.createElement('p');
        isApprovedText.textContent = ad.isApproved ? '✅ Approved' : '⌛ Not yet approved';
        isApprovedText.style.fontWeight = 'bold';
        isApprovedText.style.marginBottom = '0';

        // Append elements to card
        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardText);
        listGroup.appendChild(listItemPrice);
        if (ad.phone) listGroup.appendChild(listItemPhone);
        listGroup.appendChild(listItemEmail);

        cardFooterDiv.appendChild(isApprovedText);
        cardFooterDiv.appendChild(smallText);

        colDiv.appendChild(cardDiv);
        cardDiv.appendChild(cardBodyDiv);
        cardDiv.appendChild(listGroup);
        cardDiv.appendChild(cardFooterDiv);
        cardDiv.appendChild(buttonGroup);

        return colDiv;
    }



    /**
     * Handles the deletion of an ad.
     * @param {Event} btn - The click event object of the button clicked.
     */
    const deleteAd = async function (btn) {
        try {
            const res = await utils.fetchData(`/api/ads/${btn.srcElement.dataset.adId}`, "DELETE");
            utils.showToast(toastLive,"deleted", await res.text())
        } catch (e) {
            utils.showToast(toastLive,adErrorMessage, e.message);
        } finally {
            await fetchAds();
        }
    }

})();
