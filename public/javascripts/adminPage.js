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
     * Retrieves all ads from the server and updates the UI.
     */
    const fetchAds = async function(adType) {
        try {
            spinner.classList.remove('d-none');
            await utils.getUsersAds(`/api/${adType}Ads`, adsContainer, adType, {approveAd: approveAd, deleteAd: deleteAd})
        } catch (e) {
            utils.showToast(toastLive, adErrorMessage, e.message);
        } finally {
            spinner.classList.add('d-none');
        }
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