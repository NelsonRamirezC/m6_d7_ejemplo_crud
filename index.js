const app = require("./src/app.js")

const main = () => {
    console.log("Levantando servidor.");
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log("Servidor escuchando en http://localhost:"+PORT)
    })
}

main();