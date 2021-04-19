const Usuario = require('../models/usuarios');
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const { response } = require('express');

const validarRecaptcha = async( req, res = response, next) => {

    const {recaptcha } = req.body;
    console.log(recaptcha);

    const params = new URLSearchParams();
    params.append('secret', process.env.CAPTCHA_SECRET);
    params.append('response', recaptcha)
    if(recaptcha) {
         const respuesta = await fetch('https://www.google.com/recaptcha/api/siteverify', { method: 'POST', body: params });
         const json = await respuesta.json();
         console.log(json)
         if(!json.success) {
            return res.status(401).json({
                ok: false,
                msg: 'token invalido'
            });
         }
    }

    next();
}

module.exports = {
    validarRecaptcha
}