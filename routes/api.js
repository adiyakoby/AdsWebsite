let express = require('express');
let router = express.Router();
const db = require('../models');
const apiController = require("../controllers/apiController");

router.get('/allAds', apiController.getAllAds); // get all ads

router.get('/approvedAds', apiController.getApprovedAds); // get all ads

router.get('/pendingAds', apiController.getPendingAds); // get all ads

router.post('/postAd', apiController.postAd);  // post new ad by sending the form.

router.put('/ads/:id', apiController.approveAd);

router.delete('/ads/:id', apiController.deleteAd);

router.get('/contacts/:lastName', (req, res) => {
    return db.Contact.findAll({where: {lastName: req.params.lastName}})
        .then((contacts) => res.send(contacts))
        .catch((err) => {
            console.log('There was an error querying contacts', JSON.stringify(err))
            return res.status(400).send(err)
        });
});



router.delete('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    return db.Contact.findByPk(id)
        .then((contact) => contact.destroy({ force: true }))
        .then(() => res.status(204).send())
        .catch((err) => {
            console.log('***Error deleting contact', JSON.stringify(err))
            res.status(400).send(err)
        })
});

router.put('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return db.Contact.findByPk(id)
        .then((contact) => {
            const { firstName, lastName, phone } = req.body
            return contact.update({ firstName, lastName, phone })
                .then(() => res.send(contact))
                .catch((err) => {
                    console.log('***Error updating contact', JSON.stringify(err))
                    res.status(400).send(err)
                })
        })
});


module.exports = router;