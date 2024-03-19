'use strict';

(function () {
    const adsContainer = document.getElementById("ads-container");
    const spinner = document.getElementById("spinner-loader");
    const searchButton = document.getElementById("search");
    const searchInput = document.getElementById("search-input");


    document.addEventListener('DOMContentLoaded', async function () {
        await generateApprovedAds();

        searchButton.addEventListener('click', async function (event) {
            await generateAds();
        })

        searchInput.addEventListener('keypress', async function (event) {
            if (event.key === 'Enter') {
                await generateAds();
            }
        });
    });

    const generateApprovedAds = async function() {
        try {
            spinner.classList.remove('d-none');
            const ads = await fetchData("/api/approvedAds");
            spinner.classList.add('d-none');
            if(ads.length !== 0) {
                adsContainer.innerText = '';
                ads.forEach(ad => adsContainer.appendChild(createCustomCard(ad)));
            }
            else {
                adsContainer.innerHTML = "<div class=\"container mt-5\">\n" +
                    "      <div class=\"row\">\n" +
                    "        <div class=\"col-lg-6 mx-auto\">\n" +
                    "          <div class=\"d-flex justify-content-center align-items-center flex-column\">\n" +
                    "            <h2 class=\"text-center mb-4\">No ads available at the moment</h2>\n" +
                    "            <p class=\"text-center\">We're sorry, but it seems there are no ads available right now. Please check back later or consider posting your own ad!</p>\n" +
                    "          </div>\n" +
                    "        </div>\n" +
                    "      </div>\n" +
                    "    </div>";
            }

        } catch (error) {
            console.log('Error message:', err);
        } finally {
            spinner.classList.add('d-none');
        }



    }

    const generateAds = async function () {
        adsContainer.innerText = '';
        const ads = await fetchData(`/api/approvedAds/${encodeURIComponent(searchInput.value.trim())}`);
        ads.forEach(ad => adsContainer.appendChild(createCustomCard(ad)));
    }

    const fetchData = async function (url) {
        try {
            spinner.classList.remove('d-none');
            const response = await fetch(url);
            if (response.status !== 200)
                throw new Error(response.statusText);

            spinner.classList.add('d-none');
            return response.json();
        } catch (err) {
            console.log('Error message:', err);
            throw err;
        } finally {
            spinner.classList.add('d-none');
        }
    }
    const createCustomCard = function (ad) {

        const colDiv = document.createElement('div');
        colDiv.classList.add('col', 'mb-4');

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'h-100', 'shadow');

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

        // Append elements to card
        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardText);
        listGroup.appendChild(listItemPrice);
        if (ad.phone) listGroup.appendChild(listItemPhone);
        listGroup.appendChild(listItemEmail);

        cardFooterDiv.appendChild(smallText);
        cardDiv.appendChild(cardBodyDiv);
        cardDiv.appendChild(listGroup);
        cardDiv.appendChild(cardFooterDiv);

        colDiv.appendChild(cardDiv);

        return colDiv;
    }

    const createListItem = function (label, value) {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'border-0', 'py-1');
        listItem.innerHTML = `<strong>${label}:</strong> ${value}`;
        return listItem;
    }

})();