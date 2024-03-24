'use strict';

(function () {
    // DOM elements
    const adsContainer = document.getElementById("ads-container");
    const spinner = document.getElementById("spinner-loader");
    const searchButton = document.getElementById("search");
    const searchInput = document.getElementById("search-input");
    const toastLive = document.getElementById('liveToast');

    // Messages
    const adErrorMessage = "Something went wrong, please try again."

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
            await utils.getAds(`/api/approvedAds${searchString}`, adsContainer, 'readonly', {});
        } catch (error) {
            console.log('Error message:', error);
            utils.showToast(toastLive, adErrorMessage, error.message);
        } finally {
            spinner.classList.add('d-none');
        }
    }


})();