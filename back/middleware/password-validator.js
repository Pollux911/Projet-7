const passwordValidator = require('password-validator');

const schema = new passwordValidator();

schema
    .is().min(8)                                    // Minimum length 8
    .is().max(64)                                  // Maximum length 64
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().symbols(1)                               // Must have at least 1 symbol
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd_','Passw0rd@', 'Password123_','Password123@', 'Motdepasse123_', 'Motdepasse123@']);





module.exports = (req, res, next) => {
    try {
        if (!schema.validate(req.body.password)) {
            return res.status(400).json(schema.validate(req.body.password, { details: true }));
        } else {
            next();
        }
    }   catch (error) {
        res.status(401).json({error: error});
    }
}
