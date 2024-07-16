// Patrón Vista
// Importar librerias a utilizar
const express = require (`express`); 
const app = express ();
const cors = require (`cors`); 


// Cargar variables de entorno en el archivo .env
require(`dotenv`).config(); 

// Importar rutas
const router = require(`./routes/routerReserva`); 
//Añadir middleware 
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(process.env.URL_BASE + `/`, router);
app.use(cors()); 

app.listen(process.env.PORT, () => {
    console.log(`listent in port ${process.env.PORT}`); 

});  

