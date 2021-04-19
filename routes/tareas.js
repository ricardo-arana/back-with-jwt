/**
 * /api/auth
 */
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { crearTareaController, obtenerTareasControleler, ActualizarTareaController, eliminarTareaController} = require('../controllers/tareas');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.post('/add', [
    check('descripcion', 'La descripción es un campo obligatoio').not().isEmpty(),
    validarCampos,
    validarJWT
], crearTareaController);

router.get('/', [
    validarJWT
], obtenerTareasControleler);

router.put('/',  [
    check('descripcion', 'La descripción es un campo obligatoio').not().isEmpty(),
    check('done', 'La descripción es un campo obligatoio').not().isEmpty(),
    validarCampos,
    validarJWT
], ActualizarTareaController);

router.delete('/:tid', [
    validarJWT
] , eliminarTareaController)


module.exports = router;