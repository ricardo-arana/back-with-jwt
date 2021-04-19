const mongoose = require('mongoose');

const dbConection = async () => {


    try {
        mongoose.connect(process.env.DBCDN, 
    {useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true,
    });
    console.log('db online')
    } catch (error) {
        console.error('error al iniciar la db')
    }
    

}

module.exports = {
    dbConection
}