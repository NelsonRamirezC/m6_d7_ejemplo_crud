const express = require("express");
const {getProductos, addProductos} = require("./utils/utils.js");
const fileUpload = require("express-fileupload");
const { v4: uuidv4 } = require("uuid")

const app = express();

//MIDDLEWARES
app.use(fileUpload()); //PERMITE CAPTURAR LAS IMÁGENES Y DATOS DE UN FORMDATA

//dejar publica la carpeta public

app.use('/public', express.static(`${__dirname}/public`));

//VISTAS
app.get("/", (req, res) => {
    res.sendFile(__dirname+"/public/index.html");
})


//ENDPOINTS

app.get("/api/productos", async (req, res) => {
    try {
        let productos = await getProductos();
        res.json({code: 200, message: "ok", productos})
    } catch (error) {
        res.status(500).json({code: 500, message: "Error al obtener los productos"})
    }
})


app.post("/api/productos", async (req, res) => {
    let { nombre, precio } = req.body;
    let id = uuidv4().slice(0,6);
    let imagen  = req.files.imagen;
    let extension = imagen.mimetype.split("/")[1];

    let nombreImagen = `img-${id}.${extension}`
    imagen.mv(`${__dirname}/public/uploads/${nombreImagen}`, async (error) => {
        if(error){
            console.log(error);
            res.status(500).json({code: 500, message: "Error al registrar producto."})
        }else {
            let nuevoProducto = {
                id,
                nombre,
                precio,
                imagen: nombreImagen
            }

            await addProductos(nuevoProducto);

            res.status(201).json({code: 201, message: "Producto creado correctamente", producto: nuevoProducto});

        }
    })
})




module.exports = app;