const express = require("express");
const userSchema = require("../models/user");


const router = express.Router();

// crear material
router.post("/users", async(req, res) => {
    
    const datauser = req.body.data
    console.log(datauser)
    //formatedUser = datauser.map(usr=>{
      //  return 
    //})

    formatedUser ={
        nombre:datauser[0],
        correo:datauser[1],
        contrasena:datauser[2],
        nivelMat:datauser[3],
        nivelLec:datauser[4],
        nivelCiencias:datauser[5],
        tipo:datauser[6]
    }

    const newUser = new userSchema(formatedUser);
    //const user = userSchema.insertMany()
    newUser
       .save()
       .then((data) => res.json(data))
       .catch((error) => {
        console.log(err)
        res.json({ message: error })
    });

       //console.log("Subion _")
});


// obtener material
router.get("/users", (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// obtener un material
router.get("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// update material
router.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, correo, nivel, contrasena, tipo, estadoAnimo } = req.body;
    userSchema
        .updateOne({ _id: id }, { $set: { nombre, correo, nivel, contrasena, tipo, estadoAnimo } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// borrar material
router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// obtener un material por materia, tema, duración tipo y nivel
router.get("/users/filtrar/:nombre/:correo/:nivel/:contrasena/:tipo/:estadoAnimo", (req, res) => {
    const { nombre, correo, nivel, contrasena, tipo, estadoAnimo } = req.params;
    userSchema
        .find({ nombre, correo, nivel, contrasena, tipo, estadoAnimo })
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;