const express = require('express');
const mongoose = require("mongoose");
var bodyParser = require('body-parser')
const cors = require('cors');
require("dotenv").config();
const materialRoutes = require("./routes/material");
const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT || 9000;
app.use(cors());
app.use(express.json());
app.use('/', materialRoutes);
app.use('/', userRoutes);

app.get('/', (req,res) =>{
    res.send("Welcome to my API");
});

// mongodb connection

//console.log(process.env)
mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=> console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error(error));

app.listen(port,()=>console.log('server listening on port', port));