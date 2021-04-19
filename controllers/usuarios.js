const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios');

const getUsusarios = async (req,res) => {

    const usuarios = await Usuario.find({}, 'nombre email role');

    res.json({
        ok: true,
        usuarios
    })
}


const crearUsuario = async(req,res = response) => {
    console.log(req.body);
    const { email, password} = req.body;

    
    try {
        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }

        const usuario = new Usuario(req.body);

        // encriptar
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        // guardar usuario
        await usuario.save();
    
        res.json({
            ok: true,
            usuario
        }); 
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        })
    }

    
}


module.exports = {
    getUsusarios,
    crearUsuario,

}