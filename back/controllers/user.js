const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/');

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
                    .then(() => res.status(201).json({ message: 'Utilisateur cree !'}))
                    .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        })
};

exports.login = (req, res, next) => {
    User.findOne({where: {email: req.body.email}})
        .then( user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouve !' });
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
        .catch(error => res.status(500).json({ error }));

};

exports.deleteUser = (req, res, next) => {
    User.findOne({where: {email: req.body.email}})
        .then( user => {
            if(!user) {
                return res.status(404).json({
                    error: 'Utilisateur non trouvée !'
                })
            }
            /*if (user.uuid !== req.auth.userId || req.auth.admin === true) { // check auth or user is an Admin
                return res.status(401).json({
                    error: 'Requête non autorisée !'})
            }*/
            User.destroy({where: { email: req.body.email }})
                .then(() => res.status(200).json({ message: 'Post supprimée !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))
}