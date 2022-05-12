const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/');
const {Post} = require("../models");

exports.getUser = (req, res, next) => {
    User.findOne({where: { id: req.params.id},
    attributes: ['email', 'firstName', 'lastName']})
        .then(post => res.status(200).json(post))
        .catch(error => {
            console.log(error)
            res.status(404).json({ error });
        })
};

exports.signup = (req, res, next) => {
    console.log(req.body.email, 'fdsfds')
    User.findOne({where: {email: req.body.email}})
        .then(user => {
            if (user) {
                return res.status(401).json({ error: 'Email déjà utilisé !' });
            }
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    User.create({
                        email: req.body.email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        password: hash
                    })
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
                    .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        })
};

exports.login = (req, res, next) => {
    User.findOne({where: {email: req.body.email}})
        .then( user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            `${process.env.SECRET_KEY}`,
                            { expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => {
            console.log('erreur loginnn', error);
            res.status(500).json({ error });
        })
};

exports.deleteUser = (req, res, next) => {
    User.findOne({where: {email: req.body.email}})
        .then( user => {
            if(!user) {
                return res.status(404).json({
                    error: 'Utilisateur non trouvé !'
                })
            }
            /*if (user.uuid !== req.auth.userId || req.auth.admin === true) { // check auth or user is an Admin
                return res.status(401).json({
                    error: 'Requête non autorisée !'})
            }*/
            User.destroy({where: { email: req.body.email }})
                .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))
}