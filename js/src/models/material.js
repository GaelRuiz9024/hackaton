const mongoose = require("mongoose");

const materialSchema = mongoose.Schema({
    materia: {
        type: String,
        required: true
    },
    tema: {
        type: String,
        required: true
    },
    duracion: {
        type: String,
        required: true
    },
    tipoMaterial: {
        type: String,
        required: true
    },
    tipoAprendizaje: {
        type: String,
        required: true
    },
    nivel: {
        type: Number,
        required: true
    },
    enlace: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('material', materialSchema);