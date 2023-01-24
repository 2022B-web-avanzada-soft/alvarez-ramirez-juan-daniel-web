// Entidad EquipoFutbol
// 1. booleano: esLocal
// 2. string: nombre
// 3. string: ciudad
// 4. string: estadio
// 5. entero: fundacion
// 6. array de Jugadores: jugadores

class EquipoFutbol {
    constructor(id, esLocal, nombre, ciudad, estadio) {
        this.id = id;
        this.esLocal = esLocal;
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.estadio = estadio;
    }
}

module.exports.EquipoFutbol = EquipoFutbol;