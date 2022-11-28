const { Router } = require('express');
const  { check }  = require('express-validator');
const router = Router();

const { fieldsValidations } = require('../middlewares/fields-validations');
const {
    createNewUser,
    loginWithEmailAndPassword,
    revalidateToken
} = require('../controllers/auth.controller');
const { validateJWT } = require('../middlewares/validate-JWT');

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    fieldsValidations
], loginWithEmailAndPassword);

router.post('/register', [
    check('name', 'Name is required').not().isEmpty().isLength({ min: 3 }),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    fieldsValidations
], createNewUser);

router.get('/renew-token', validateJWT, revalidateToken);


module.exports = router; 