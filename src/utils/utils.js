const fs = require("fs/promises");


const getProductos = () => {
    return new Promise( async(resolve, reject) => {
        try {
            let dataJson = JSON.parse(await fs.readFile(__dirname+"/../data/productos.json", "utf8"));
            
            resolve(dataJson.registros);
            
        } catch (error) {
            reject("Error al leer los productos");
        }

    })
}

const addProductos = (producto) => {
    return new Promise( async(resolve, reject) => {
        try {
            let dataJson = JSON.parse(await fs.readFile(__dirname+"/../data/productos.json", "utf8"));
            
            dataJson.registros.push(producto);

            await fs.writeFile(__dirname+"/../data/productos.json", JSON.stringify(dataJson, null, 4), "utf8");
            
            resolve("Producto agregado correctamente.");
            
        } catch (error) {
            reject("Error al leer los productos");
        }

    })
}

module.exports = {
    getProductos,
    addProductos
};
