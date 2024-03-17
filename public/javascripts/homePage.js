'use strict';

(function () {
    const adsContainer = document.getElementById("ads-container");
    const spinner = document.getElementById("spinner-loader");

    document.addEventListener('DOMContentLoaded', async function () {
        const ads = await fetchData("/api/allAds");
        ads.forEach(ad => adsContainer.appendChild(createCustomCard(ad)));
    });

    const fetchData = async function (url) {
        try {
            const response = await fetch(url);
            if (response.status !== 200)
                throw new Error(response.statusText);
            return response.json();
        } catch (err) {
            console.log('Error message:', err);
            throw err; // Re-throw the error so it can be caught by the caller if needed
        }
    }
    const createCustomCard = function (ad) {
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

        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardText);

        listGroup.appendChild(listItemPrice);
        if(ad.phone !== '' && ad.phone !== undefined)
            listGroup.appendChild(listItemPhone);
        listGroup.appendChild(listItemEmail);

        cardBodyDiv.appendChild(listGroup);

        cardFooterDiv.appendChild(smallText);

        cardDiv.appendChild(cardBodyDiv);
        cardDiv.appendChild(cardFooterDiv);

        colDiv.appendChild(cardDiv);

        return colDiv;
    }
})();