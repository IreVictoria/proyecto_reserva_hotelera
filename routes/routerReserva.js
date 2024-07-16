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