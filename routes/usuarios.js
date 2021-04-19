/**
 * /api/usuario
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsusarios, crearUsuario } = require('../controllers/usuarios');
const { validarRecaptcha } = require('../middlewares/recaptcha');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',[
    validarJWT
] , getUsusarios);


router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'error con el    formato de email').isEmail(),
    check('recaptcha', 'Falta el token de recaptcha').not().isEmpty(),
    validarCampos,
    validarRecaptcha
] ,crearUsuario);





module.exports = router;