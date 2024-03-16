let express = require('express');
let router = express.Router();
const db = require('../models');

    router.get('/allAds', async (req, res) => {
        return db.Ad.findAll({ order: [['createdAt', 'DESC']]})
            .then((ads) => res.send(ads))
            .catch((err) => {
                console.log('There was an error querying contacts', JSON.stringify(err))
                err.error = 1; // some error code for client side
                return res.status(400).send(err) // send the error to the client
            });
});

router.get('/contacts/:lastName', (req, res) => {
    return db.Contact.findAll({where: {lastName: req.params.lastName}})
        .then((contacts) => res.send(contacts))
        .catch((err) => {
            console.log('There was an error querying contacts', JSON.stringify(err))
            return res.status(400).send(err)
        });
});

router.post('/postAd', async (req, res) => {
    const { title, description, price, email, phone } = req.body;
    try {
        const ad = await db.Ad.create({ title, description, price, phone, email });
        res.status(201).render('newAd');
    }
    catch(err) {
        console.log('*** error creating a Ad', JSON.stringify(err))
        return res.status(400).render('error', {message:err.message});
    }
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