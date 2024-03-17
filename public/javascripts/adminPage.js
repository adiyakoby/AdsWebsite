'use strict';

(function () {
    const adsContainer = document.getElementById("ads-container");
    const spinner = document.getElementById("spinner-loader");
    const approvedAdsBtn = document.getElementById("approved-ads");
    const pendingAdsBtn = document.getElementById("pending-ads");
    const toastLive = document.getElementById('liveToast')

    //messages
    const adApprovedMessage = "Ad was approved successfully.";
    const adDeletedMessage = "Ad was deleted successfully.";
    const adErrorMessage = "Something went wrong, please try again."

    document.addEventListener('DOMContentLoaded', async function () {

        await fetchAds('pending');

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
    const getAds = async function (adType) {
        const res = await fetchData(`/api/${adType}Ads`);
        const ads = await res.json();
        adsContainer.innerHTML = '';
        if(ads.length > 0)
            ads.forEach(ad => adsContainer.appendChild(createCustomCard(ad, adType)));
        else
            adsContainer.innerHTML = "<p> No ads to show </p>";
    }
    const getPendingAds = async function () {
        const res = await fetchData("/api/pendingAds");
        const ads = await res.json();
        adsContainer.innerHTML = '';
        if(ads.length > 0)
            ads.forEach(ad => adsContainer.appendChild(createCustomCard(ad)));
        else
            adsContainer.innerHTML = "<p> No ads to show </p>";
    }

    const getApprovedAds = async function () {
        const ads = await fetchData("/api/approvedAds");
        adsContainer.innerHTML = '';
        if(ads.length > 0)
            ads.forEach(ad => adsContainer.appendChild(createCustomCard(ad)));
        else
            adsContainer.innerHTML = "<p> No ads to show </p>";
    }

    const createCustomCard = function (ad, adType) {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col');

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'h-100', 'border-primary');

        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = ad.title;

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = ad.description;

        const listGroup = document.createElement('ul');
        listGroup.classList.add('list-group', 'list-group-flush');

        const listItemPrice = document.createElement('li');
        listItemPrice.classList.add('list-group-item', 'border-primary');
        listItemPrice.textContent = `price: ${ad.price}`;

        const listItemPhone = document.createElement('li');
        listItemPhone.classList.add('list-group-item', 'border-primary');
        listItemPhone.textContent = `phone number: ${ad.phone}`;

        const listItemEmail = document.createElement('li');
        listItemEmail.classList.add('list-group-item');
        listItemEmail.textContent = `email: ${ad.email}`;

        const cardFooterDiv = document.createElement('div');
        cardFooterDiv.classList.add('card-footer');

        const smallText = document.createElement('small');
        smallText.classList.add('text-body-secondary');
        smallText.textContent = `Last updated ${Math.floor((new Date() - new Date(ad.createdAt)) / (1000*60))} mins ago`;

        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('d-flex', 'justify-content-center', 'mb-3');

        if(typeof adType !== 'undefined' && adType === 'pending') {

            const buttonV = document.createElement('button');
            buttonV.classList.add('btn', 'btn-success', 'me-2', 'col-5');
            buttonV.textContent = 'V';

            buttonV.setAttribute('data-ad-id', ad.id);
            buttonV.addEventListener('click', approveAd);

            buttonGroup.appendChild(buttonV);
        }
        const buttonX = document.createElement('button');

        buttonX.classList.add('btn', 'btn-danger', 'col-5');
        buttonX.textContent = 'X';

        buttonX.setAttribute('data-ad-id', ad.id);
        buttonX.addEventListener('click', deleteAd);

        buttonGroup.appendChild(buttonX);


        // Append elements to card
        cardDiv.appendChild(buttonGroup);
        cardDiv.appendChild(cardBodyDiv);
        cardDiv.appendChild(cardFooterDiv);

        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardText);

        listGroup.appendChild(listItemPrice);
        if (ad.phone !== '' && ad.phone !== undefined)
            listGroup.appendChild(listItemPhone);
        listGroup.appendChild(listItemEmail);

        cardFooterDiv.appendChild(smallText);

        colDiv.appendChild(cardDiv);
        cardBodyDiv.appendChild(listGroup);

        return colDiv;
    }

    const approveAd = async function (btn) {
        const res = await fetchData(`/api/ads/${btn.srcElement.dataset.adId}`, "PUT");
        if(res.ok) {
            await fetchAds('pending');
            showToast("approved", adApprovedMessage)
        } else {
            showToast("", adErrorMessage);
        }



    }

    const deleteAd = async function (btn) {
        const res = await fetchData(`/api/ads/${btn.srcElement.dataset.adId}`, "DELETE");
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
        let success = header.toLowerCase() === "approved"  || header.toLowerCase() === "deleted" ? 'success' : 'danger';
        return `<div class="toast-header text-bg-${success}">
                <strong class="me-auto">Ad ${header} !</strong>
                <small>Now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body ">
                    ${msg}
                </div>`
    };

    /**
     * Displays a toast notification with the specified header and message.
     * @param {string} header - The header text for the toast notification.
     * @param {string} msg - The message text for the toast notification.
     */
    const showToast = (header, msg) => {
        toastLive.innerHTML = toastBodyCreator(header, msg);
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);
        toastBootstrap.show();
    };

})();