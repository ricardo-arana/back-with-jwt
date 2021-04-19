const { Schema, model } = require('mongoose');

const tareaSchema = Schema({
    descripcion: {
        type: String,
        require: true
    },
    create: {
        type: Date,
        require: true,
        default: () => new Date()
    },
    done: {
        type: Boolean,
        require: true,
        default: false
    },
    createBy: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'tareas' });

tareaSchema.method('toJSON', function() {
    const { __v, _id,...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model ( 'Tarea', tareaSchema );