const express = require("express");

const app = express();

//VISTAS
app.get("/", (req, res) => {
    res.sendFile(__dirname+"/public/index.html");
})


//ENDPOINTS


module.exports = app;