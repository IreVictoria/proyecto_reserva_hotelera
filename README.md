[![banner-udd.png](https://i.postimg.cc/vHGf15wB/banner-udd.png)](https://postimg.cc/4nFmq7dk)

# Proyecto N°4: Reservas Hoteleras. 

------------

<p>
  
  En este proyecto se dará a conocer la construcción de una aplicación de servicios de `Reservas Hoteleras` este trabajo se realizará en el editor de código `Visual Studio Code` en el cual trabajaremos con `Node.js` y `Express` y utilizaremos el lenguaje de programación JavaScript. A continuación, se mostrarán los requisitos requeridos para construir este proyecto y su paso a paso de su realización. 

</p>


------------

### Requisitos a cumplir en el proyecto. 

------------


<p>
  
- Construir una aplicación de servicios para la gestión de reservas en hoteles que involucre las 4 operaciones CRUD y otras 6 adicionales relacionadas con filtros, utilizando Node.js y Express.

- Opcionalmente, realizar un proceso de investigación relacionado con la documentación de API, usando Swagger, con la estandarización OPENAPI, la cual se utiliza en equipos internacionales para construir servicios escalables.

- Utilizar Node.js y Express para el desarrollo del servidor.

- Contar con un archivo .env para las variables de entorno, el cual establecerás el puerto.

- Contar con un archivo .gitignore que incluya las carpetas y archivos que deberán ocultarse para el repositorio.

- Usar una arquitectura de carpetas clara.

Implementación de los siguiente Endpoints: 

1. Permitir la creación de reservas con los detalles necesarios (por ejemplo, hotel, tipo de habitación, número de huéspedes, fechas, etc.).

2. Permitir la visualización de la lista de reservas.

3. Permitir la obtención de la información de una reserva específica.

4. Permitir la actualización de la información de una reserva.

5. Permitir la eliminación de una reserva.

6. Permitir la búsqueda de reservas por hotel, rango de fechas, tipo de habitación, estado y número de huéspedes.

7. Almacenar los datos de las reservas en una estructura de datos.
   

</p>

------------

### Construcción paso a paso de la aplicación de servicios hotelera. 

------------

<p>
  
Antes de comenzar a construir este proyecto debemos primero nuestra carpeta en donde se ejecutará nuestro proyecto desde la terminal e instaleremos todas las herramientas a utilizar en el proyecto como se muestra a continuación: 

</p>

[![Captura-de-pantalla-terminal-0.png](https://i.postimg.cc/ZYH0MgXb/Captura-de-pantalla-terminal-0.png)](https://postimg.cc/vD1Q1PQk)


[![Captura-de-pantalla-terminal-1.png](https://i.postimg.cc/Sx2sjKRR/Captura-de-pantalla-terminal-1.png)](https://postimg.cc/21YmKr4N)

<p>
  
Después Estructuramos y creamos por patrón modular el orden de nuestras carpetas y archivos como se muestra en la imagen: 

</p>


[![carpetas.png](https://i.postimg.cc/nrX8TC6Q/carpetas.png)](https://postimg.cc/0K1Hy258)



<p>
  
En nuestro archivo `package.json` establecemos el `script start` (nodemon) para usarlo en producción y tendremos además la instalación de cada una de las dependencias que requiere el proyecto. 

</p>


[![Captura-de-pantalla-script-y-dependencias.png](https://i.postimg.cc/YSBp9fTD/Captura-de-pantalla-script-y-dependencias.png)](https://postimg.cc/ZWjks3b6)


<p>
  
Luego establecemos nuestro código en cada una de las carpetas y archivos creados, primero tendremos el código del patrón vista en el archivo `index.js` como acceso principal.

</p>

```javascript
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

```

<p>
  
En el archivo `.env` establecemos el puerto y la URL que utilizaremos en el proyecto.

</p>

```javascript
#Designar el puerto.
PORT= 3000 
# Designar base url 
URL_BASE=/api 
```

<p>
  
Después estableceremos las rutas de `peticiones CRUD` en nuestro archivo routerReservas.js. 

</p>

```javascript
const express = require(`express`);
//creación de router express
const router = express.Router();
const reservationController = require(`../controllers/controllerReserva`);

// Realizar ruteo de peticiones


 router.post(`/reservas`, reservationController.createReservation);
 router.get(`/reservas`, reservationController.readAllReservation);
 router.get(`/reservas/:id`, reservationController.readOneReservationById);
 router.put(`/reservas/:id`, reservationController.updateReservation);
 router.delete(`/reservas/:id`, reservationController.deleteReservation);
 router.get(`/search`, reservationController.filterReservation); 

//exportar modulo para utilizarlo en otras aplicaciones
module.exports = router;

```
<p>
  
Una vez establecida nuestras rutas, se realiza el código en la carpeta controllers en el archivo `controllerReserva.js`.

</p>

```javascript
//Patrón Controlador
// Importar librerias a utilizar
const Reservation = require(`../model/modelReserva`);
const dayjs = require(`dayjs`);
const { v4: uuidv4} = require("uuid");

// Crearemos un arreglo vacío donde se puedan ir agregando las reservas.

//1.- Crear nuevas reservas del hotel. 
let reservations = [] ;

exports.createReservation = async (req, res) => { 
    const {nameHotel, numberGuests, typeRoom, checkIn, checkOut, name, email, paymentStatus } = req.body; 
     console.log( `Datos Recibidos:`, req.body); 

     // Dar formatos a las fechas

    const parsedCheckIn = dayjs(checkIn).format(`DD/MM/YYYY`);
    const parsedCheckOut = dayjs(checkOut).format(`DD/MM/YYYY`); 

     // verificar fechas convertidas
     console.log(`Fecha de llegada:`, parsedCheckIn);
     console.log(`Fecha de salida:`, parsedCheckOut); 
     
     // Ocuparemos la libreria uuidv4 para agregar id a las reservas creadas. 

    const newReservation = new Reservation (
        uuidv4 (),
        nameHotel,
        parsedCheckIn,
        parsedCheckOut,
        numberGuests,
        typeRoom,
        name,
        email,
        paymentStatus
    ); 
    reservations.push(newReservation);
    console.log(`Reservas:`, reservations); 

    res.status(201).json({
        msg: `Reserva creada con éxito`,
        data: newReservation,
    });
    
}; 

//2.- Obtener lista de reservas.

exports.readAllReservation = async (req, res) => {
    res.json ({
        msg: `Reservas obtenidas con éxito`,
        data: reservations,
    });
};

//3.- Obtener información de una reserva en especifico.
exports.readOneReservationById = async (req, res) => { 
    const reservationId = req.params.id;
    const reservation = reservations.find(reservation => reservation.id === reservationId);
    
    if (!reservation) {
        return res.status(404).json({msg: `Reserva no encontrada`})
    }

    res.json({
        msg: `Reserva obtenida con éxito.`,
        data: reservation,
    });
}; 

//4.- Actualización de información de una reserva.

exports.updateReservation = async (req, res) => {
    const reservationId = req.params.id;
    const reservationIndex = reservations.findIndex(reservation => reservation.id === reservationId);

    if (reservationIndex === -1){
        return res.status(404).json({msg: `Reserva no encontrada`});
    }

    // spread operator (operador de propagación)

    reservations[reservationIndex] = { ...reservations[reservationIndex], ...req.body}

    return res.json({
        msg: `Reserva modificada con éxito.`,
        data: reservations[reservationIndex],
    })

};

//5.- Eliminar una reserva del hotel 

exports.deleteReservation = async (req, res) => {
    const reservationId = req.params.id;
    const reservationIndex = reservations.findIndex(reservation => reservation.id === reservationId);

    if(reservationIndex === -1) {
        return res.status(404).json({msg: `Reserva no encontrada`});
    }

    reservations.splice(reservationIndex, 1)
    res.json({ msg: `Reserva eliminada con éxito.`})


};

//6.- Realizar busqueda de reservas por filtros. 

exports.filterReservation = async (req, res) => {
    const {nameHotel, numberGuests, typeRoom, checkIn, checkOut, paymentStatus } = req.query
    const filteredRerservations = reservations.filter((reservation) => {
        if (nameHotel && reservation.nameHotel !== nameHotel){
            return false;
        }
        if (numberGuests && reservation.numberGuests !== parseInt(numberGuests)) {
            return false;
        }
        if (typeRoom && reservation.typeRoom !== typeRoom) {
            return false;
        }
        if (checkIn && reservation.checkIn !== checkIn) {
            return false;
        }
        if (checkOut && reservation.checkOut !== checkOut) {
            return false; 
        }
        if (paymentStatus && reservation.paymentStatus !== paymentStatus){
            return false;
        }
        return true;
    }); 

    if (filteredRerservations.length === 0) {
        return res.status(404).json({ msg: `Reserva no encontrada`});
    }
    res.json ({ 
        msg: `Reservaciones filtradas con éxito.`,
        data: filteredRerservations
    });
}

```

<p>
  
Ahora que tenemos todo el código ya escrito en cada archivo correspondiente por medio de la herramienta `ThunderClient` simularemos la llamada a nuestras APIS. 

</p> 

<p>
  
Para poder probar el proyecto se creó un archivo llamado `prueba.json` con el fin de poder simular y probar las distintas peticiones creadas. 

</p>


```json
[
    {
        "nameHotel":"Hotel Paraíso",
        "numberGuests": "2",
        "typeRoom": "Doble",
        "checkIn": "2024-04-10",
        "checkOut": "2024-04-30",
        "name": "Leila Fernández",
        "email": "leila.fernandez@ejemplo.com", 
        "paymentStatus": "pagado"

    },
    {
        "nameHotel":"Hotel Paraíso",
        "numberGuests": "1 personas",
        "typeRoom": "Individual",
        "checkIn": "2024-03-05",
        "checkOut": "2024-04-01",
        "name": "Magdalena Sanhueza",
        "email": "magdalena.sanhueza@ejemplo.com", 
        "paymentStatus": "pagado"

    },
    {
        "nameHotel":"Hotel Paraíso",
        "numberGuests": "3 personas",
        "typeRoom": "Doble",
        "checkIn": "2024-05-21",
        "checkOut": "2024-05-30",
        "name": "Irene Guzmán",
        "email": "Irene.guzman@ejemplo.com", 
        "paymentStatus": "pagado"

    },
    {
        "nameHotel":"Hotel Paraíso",
        "numberGuests": "1 personas",
        "typeRoom": "Suite",
        "checkIn": "2024-06-17",
        "checkOut": "2024-06-27",
        "name": "Yoselyn Navarrete",
        "email": "yoselyn.navarrete@ejemplo.com", 
        "paymentStatus": "pagado"

    }
   

]
```

------------

### Simulación llamadas APIS. 

------------


<p>
  
1.- Primero utilizaremos el `Create Reservation` para crear una reserva. Creamos un new request con una petición `POST`. Realizaremos la creación de dos reservas como se muestran en las siguientes imagenes: 

</p>

[![Captura-de-pantalla-create-1.png](https://i.postimg.cc/RCWVgF1R/Captura-de-pantalla-create-1.png)](https://postimg.cc/MX8STzFM)


[![Captura-de-pantalla-create-2.png](https://i.postimg.cc/CxghMs3P/Captura-de-pantalla-create-2.png)](https://postimg.cc/Wh5LXgbg)


<p>
  
 2.- Utilizaremos ahora el `Read All Reservation` el cual nos traera en un arreglo todas las reservas creadas (que en este caso solo creamos 2 reservas). Creamos un new request con una petición `GET` 
 
</p>

[![Captura-de-pantalla-read-all-reservation.png](https://i.postimg.cc/nrmxpX0f/Captura-de-pantalla-read-all-reservation.png)](https://postimg.cc/BPJkCQrm)

<p>
  
3.- Luego utilizaremos el `Read One Reservation` el cual por medio de un `id` nos traera solo una reserva en especifica. Creamos un new request con una petición `GET`  como se muestran en las siguientes imagenes: 
  
</p>


[![1-imagen-nueva.png](https://i.postimg.cc/7YMRr1wn/1-imagen-nueva.png)](https://postimg.cc/jL2cz7WD)



[![2-imagen-nueva.png](https://i.postimg.cc/MGX3BhR9/2-imagen-nueva.png)](https://postimg.cc/WDL7LY5Z)



<p>
  
4.- Ahora utilizaremos el `Update Reservation` el cual nos permitira modificar cambios en alguna reserva en este caso cambiaremos el nombre del cliente y lo haremos también requiriendo un `id`. Creamos un new request con una petición `PUT`, como se muestran en las siguientes imagenes: 

</p>

[![1-1-update.png](https://i.postimg.cc/B6BFnv6k/1-1-update.png)](https://postimg.cc/phyr0RKJ)





[![1-2-update.png](https://i.postimg.cc/SxKjWrKZ/1-2-update.png)](https://postimg.cc/JG918jZJ)





[![1-3-update.png](https://i.postimg.cc/SsLy02s2/1-3-update.png)](https://postimg.cc/k64rK5Wq)


<p>

  
5.- Por último utilizaremos el `Delete Reservation` para eliminar una reserva, requiriendo un `id`. Creamos un new request con una petición `DELETE`, como se muestran en las siguientes imagenes: 


</p>



[![Captura-de-pantalla-delete-1.png](https://i.postimg.cc/tggtfW4J/Captura-de-pantalla-delete-1.png)](https://postimg.cc/87q6fFWg)






[![Captura-de-pantalla-delete-2.png](https://i.postimg.cc/L8xjz53p/Captura-de-pantalla-delete-2.png)](https://postimg.cc/zyRLNJQt)






[![Captura-de-pantalla-delete3.png](https://i.postimg.cc/MGXVtw9j/Captura-de-pantalla-delete3.png)](https://postimg.cc/1gh85kh9)



