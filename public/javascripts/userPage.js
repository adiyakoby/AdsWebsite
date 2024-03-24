'use strict';


(function () {
    const userUrl = `/api/userAds`;
    const adsType = 'user';

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
    const getAds = async function(adType) {
        try {
            spinner.classList.remove('d-none');
            await utils.getAds(userUrl, adsContainer, adsType, { deleteAd: deleteAd})
        } catch (e) {
            utils.showToast(toastLive, adErrorMessage, e.message);
        } finally {
            spinner.classList.add('d-none');
        }
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
