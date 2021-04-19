const { response } = require('express');
const Usuario = require('../models/usuarios');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const loginController = async(req, res= response) => {

    const { email, password } = req.body;

    try {
        const usuariodb = await Usuario.findOne({email});
        // verificar email
        if(!usuariodb) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o contraseña invalida'
            })
        }

        // verificar constraseña
        const validPassword = bcrypt.compareSync(password, usuariodb.password);
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o contraseña invalida'
            })
        }

        // generar el token

        const token = await generarJWT(usuariodb.id );

        return res.status(200).json({
            ok: true,
            token
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'ocurrio un error inesperado'
        })
    }

    

}

const validarTokenController = async( req, res= response ) => {
    try {
        const { uid } = req;
        const usuariodb  = await Usuario.findById(uid);
        return res.json({
            ok: true,
            usuario:  usuariodb
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'ocurrio un error inesperado'
        })
    }
}

module.exports = {
    loginController,
    validarTokenController
}