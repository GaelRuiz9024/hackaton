const express = require("express");
const materialSchema = require("../models/material");


const router = express.Router();

// crear material
router.post("/materiales", (req,res)=> {
    const material = materialSchema(req.body);
    material
        .save()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}));
});

// obtener material
router.get("/materiales", (req,res)=> {
    materialSchema
        .find()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}));
});

// obtener un material
router.get("/materiales/:materia", (req,res)=> {
    const { materia} = req.params;
    materialSchema
        .findById(materia)
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}));
});

// update material
router.put("/materiales/:id", (req,res)=> {
    const { id } = req.params;
    const { materia, duracion, tipoMaterial, tipoAprendizaje, nivel, enlace } = req.body;
    materialSchema
        .updateOne({_id:id},{$set: {materia, duracion, tipoMaterial, tipoAprendizaje, nivel, enlace}})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}));
});

// borrar material
router.delete("/materiales/:id", (req,res)=> {
    const { id } = req.params;
    materialSchema
        .deleteOne({_id:id})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message:error}));
});

// obtener un material por materia, tema, duración tipo y nivel
router.get("/materiales/filtrar/:materia/:tema/:duracion/:tipo/:nivel", (req, res) => {
    const { materia, tema, duracion, tipoMaterial, tipoAprendizaje, nivel } = req.params;
    materialSchema
        .find({ materia, tema, duracion, tipoMaterial, tipoAprendizaje, nivel })
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;