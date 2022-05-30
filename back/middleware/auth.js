const jwt = require('jsonwebtoken');
const { User } = require('../models/');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
        const userId = decodedToken.userId;
        req.auth = { userId };
        User.findOne({where: { id: userId},
            attributes: ['isAdmin']})
            .then(user => {
                if ((req.body.userId && req.body.userId !== userId) && user.isAdmin === false){
                throw 'User ID non valable !';
            }
            else{ next();}
            })
            .catch(error => {
                res.status(404).json({ error });
             })
    }   catch (error) {
        console.log(error, 'erroreere')
        res.status(401).json({error: 'Requête non authentifiée !'});
    }
};