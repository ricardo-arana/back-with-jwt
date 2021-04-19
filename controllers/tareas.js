const { response, request } = require('express');
const Tarea = require('../models/tareas');


const crearTareaController = async(req, res = response) => {
    const { descripcion } = req.body;
    const usercreated = req.uid;
    const tarea = new Tarea({ descripcion, createBy: usercreated });

    try {
        await tarea.save();
        return res.status(201).json({
            ok: true,
            msg: 'Tarea creada correctamente'
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado'
        })
    }
}

const obtenerTareasControleler = async(req, res = response) => {
    
    try {
        const createBy = req.uid;
        const tareasdb = Tarea.find({ createBy }, null, {sort: '-create'});
        const data = await tareasdb.exec();
        return res.status(201).json({
            ok: true,
            msg: 'Tareas encontradas',
            tareas: data
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado'
        })
    }

}

const ActualizarTareaController = async(req, res = response) => {
    try {
        const uid =  req.uid;
        const tarea = req.body;
        const tareadb = await Tarea.findById(tarea.id).exec();
        const newTarea = {
            ...tarea
        }
        if( tarea.createBy ===  uid) {
            const tareaActulizada = await Tarea.findByIdAndUpdate(tarea.id, newTarea,  {new: true});
            return res.json({
                ok: true,
                tarea: tareaActulizada
            });
        } else {
            return res.status(401).json({
                ok: false,
                msg: 'No esta  autorizado para actualizar esta tarea'
            })
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado'
        })
    }
}

const eliminarTareaController = async(req = request, res =  response)  => {
    const uid =  req.uid;
    const tareaid = req.params.tid;
    console.log(uid);
    try {
        const tareadb = await Tarea.findById(tareaid).exec();
        const creador = tareadb.createBy.toString();
        if( creador  ===  uid) {
            const tareaBorrada = await Tarea.findByIdAndDelete(tareaid);
            return res.json({
                ok: true,
                tarea: tareaBorrada
            });
        } else {
            return res.status(401).json({
                ok: false,
                msg: 'No esta  autorizado para actualizar esta tarea'
            })
        }
    } catch (error) {
        console.error(error)
         return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado'
        })
    }
}

module.exports = { crearTareaController, obtenerTareasControleler, ActualizarTareaController,
    eliminarTareaController
}