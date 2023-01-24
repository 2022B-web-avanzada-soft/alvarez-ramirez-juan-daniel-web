//Entidad Jugador
// 1. booleano: esTitular
// 2. string: nombre
// 3. string: apellido
// 4. entero: edad
// 5. entero: numero

class Jugador {
    constructor(id, esTitular, nombre, apellido, edad, numero, idEquipo) {
        this.id = id;
        this.esTitular = esTitular;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.numero = numero;
        this.idEquipo = idEquipo;
    }
}

module.exports.Jugador = Jugador;