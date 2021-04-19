const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise( (resolve, reject) => {
        const payload = {
            uid,
        }
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        }, (err, token) => {
    
            if(err) {
                console.log(err);
                reject('no se pudo generar el json web token')
            } else {
                resolve(token)
            }
        });
    })

    


}

 module.exports = {
     generarJWT
 }