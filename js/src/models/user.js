const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        //required: true
    },
    contrasena: {
        type: String,
        //required: true
    },
    nivelMat: {
        type: Number,
        //required: true
    },
    nivelLec: {
        type: Number,
        //required: true
    },
    nivelCiencias: {
        type: Number,
        //required: true
    },
    
    tipo: {
        type: String,
        //required: true
    }
});

module.exports = mongoose.model('user', userSchema);