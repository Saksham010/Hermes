const {check} = require("express-validator");

//Validator for registration
exports.registerValidator = [
    check('fname','First name cannot be empty').not().isEmpty(),
    check('lname','Last name cannot be empty').not().isEmpty(),
    check('email','Email cannot be empty').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),
    check('password','Password must be atleast 6 characters and have atleast one number,one lowercase, one uppercase and one symbol').isStrongPassword({
        minLength:6,
        minLowercase:1,
        minUppercase:1,
        minSymbols:1
    })
]

//Validator for login
exports.loginValidator = [
    check('email','Email cannot be empty').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),
    check('password','Password must be atleast 6 characters and have atleast one number,one lowercase, one uppercase and one symbol').isStrongPassword({
        minLength:6,
        minLowercase:1,
        minUppercase:1,
        minSymbols:1
    })
]

