const Joi = require('joi');


const schema = Joi.object({
    email: Joi.string().email().message({'string.email': 'Email invalide', 'string.empty': 'Champs email vide'})
}).unknown(true);


module.exports = (req, res, next) => {

    try {
        console.log(req.body);
        const validateReturn = schema.validate(req.body);
        if (validateReturn.error) {

            return res.status(400).json(validateReturn.error?.details[0]?.message);
        } else {
            next();
        }
    }   catch (error) {
        res.status(401).json({error: error});
    }
}