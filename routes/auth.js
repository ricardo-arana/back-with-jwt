/**
 * /api/auth
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { loginController, validarTokenController } = require('../controllers/auth');
const { validarRecaptcha } = require('../middlewares/recaptcha');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.post('/login', [
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'error con el    formato de email').isEmail(),
    validarCampos,
    validarRecaptcha
], loginController);

router.get('/validar', [
    validarJWT
], validarTokenController)

module.exports = router;