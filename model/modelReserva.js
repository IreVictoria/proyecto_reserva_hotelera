//Patrón Modelo 

class Reservation {
    constructor (id, nameHotel, numberGuests, typeRoom, checkIn, checkOut, name, email, paymentStatus){
        this.id = id;
        this.nameHotel = nameHotel;
        this.numberGuests = numberGuests;
        this.typeRoom = typeRoom;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.name = name;
        this.email = email;
        this.paymentStatus = paymentStatus

    }

    getInfo () {
        return (`Nombre: ${this.name} Email: ${this.email} Nombre hotel: ${this.nameHotel} Fecha de entrada: ${this.checkIn} Fecha de salida: ${this.checkOut} Tipo de habitación: ${this.typeRoom} Numero de personas: ${this.numberGuests} Estado de pago: ${this.paymentStatus}`); 
    }
  
}
// Exportar objetos
module.exports =  Reservation ; 