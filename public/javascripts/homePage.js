'use strict';

(function () {
    // DOM elements
    const adsContainer = document.getElementById("ads-container");
    const spinner = document.getElementById("spinner-loader");
    const searchButton = document.getElementById("search");
    const searchInput = document.getElementById("search-input");


    /**
     * Event listener to ensure DOM content is fully loaded
     */
    document.addEventListener('DOMContentLoaded', async function () {
        await generateApprovedAds(''); // Load all approved ads when DOM is loaded

        // Event listener for search button click
        searchButton.addEventListener('click', async function (event) {
            await generateApprovedAds(searchInput.value); // Load approved ads based on user input.
        })

        // Event listener for pressing Enter in search input
        searchInput.addEventListener('keypress', async function (event) {
            if (event.key === 'Enter') {
                await generateApprovedAds(searchInput.value); // Load approved ads based on user input.
            }
        });
    });

    /**
     * Fetches ads from the server based on a search string, if provided.
     * @param {string} string - The search string to filter ads (optional).
     */
    const generateApprovedAds = async function(string) {
        try {
            const searchString = string ? `/${encodeURIComponent(string.trim())}` : '';
            spinner.classList.remove('d-none');
            const ads = await fetchData(`/api/approvedAds${searchString}`);
            updateAdsContainer(ads);
        } catch (error) {
            console.log('Error message:', error);
        } finally {
            spinner.classList.add('d-none');
        }
    }

    /**
     * Updates the ads container with the provided ads.
     * @param {Array} ads - An array of ad objects
     */
    const updateAdsContainer = function(ads) {
        if (ads && ads.length !== 0) {
            adsContainer.innerHTML = '';
            ads.forEach(ad => adsContainer.appendChild(createCustomCard(ad)));
        } else {
            adsContainer.innerHTML = generateNoAdsTemplate();
        }
    };

    /**
     * Generates HTML template for displaying no ads message.
     * @returns {string} - HTML string for no ads message
     */
    function generateNoAdsTemplate() {
        return `
            <div class="container mt-5">
                <div class="row">
                    <div class="col-lg-6 mx-auto">
                        <div class="d-flex justify-content-center align-items-center flex-column">
                            <h2 class="text-center mb-4">No ads available at the moment</h2>
                            <p class="text-center">We're sorry, but it seems there are no ads available right now. Please check back later or consider posting your own ad!</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }


    /**
     * Fetches data from the specified URL.
     * @param {string} url - The URL to fetch data from
     * @returns {Promise} - A promise that resolves to the fetched data
     */
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

    /**
     * Creates a custom card element for displaying ad details.
     * @param {Object} ad - An ad object containing ad details
     * @returns {Element} - The custom card element
     */
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

    /**
     * Creates a list item element with label and value.
     * @param {string} label - The label for the list item
     * @param {string} value - The value for the list item
     * @returns {Element} - The list item element
     */
    const createListItem = function (label, value) {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'border-0', 'py-1');
        listItem.innerHTML = `<strong>${label}:</strong> ${value}`;
        return listItem;
    }

})();