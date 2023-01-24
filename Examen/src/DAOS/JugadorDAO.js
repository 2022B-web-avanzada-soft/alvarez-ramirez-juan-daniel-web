// DAO de la entidad Jugador

const { Jugador } = require('../entities/Jugador');
const {readFile} = require("../fileManager/readFile")
const {writeFile} = require("../fileManager/writeFile")

class JugadorDAO {
    constructor(path) {
        this.jugadores = [];
        this.path = path;
    }

    agregarJugador(id, esTitular, nombre, apellido, edad, numero, idEquipo) {
        if (this.jugadores.find((j) => j.id === id)) {
            console.log("Un jugador con ese id ya existe\n");
            return;
        }
        const jugador = new Jugador(id, esTitular, nombre, apellido, edad, numero, idEquipo);
        this.jugadores.push(jugador);
    }

    eliminarJugador(id) {
        this.jugadores = this.jugadores.filter((j) => j.id !== id);
    }

    modificarJugador(id, esTitular, nombre, apellido, edad, numero, idEquipo) {
        const jugador = this.jugadores.find((j) => j.id === id);
        jugador.esTitular = esTitular;
        jugador.nombre = nombre;
        jugador.apellido = apellido;
        jugador.edad = edad;
        jugador.numero = numero;
        jugador.idEquipo = idEquipo;
    }

    listarJugadores() {
        return this.jugadores;
    }

    obtenerJugador(id) {
        return this.jugadores.find((j) => j.id === id);
    }

    async cargarJugadores() {
        // cargamos un archivo json que contiene todos los datos de los jugadores
        const data = await readFile(this.path)
        const dataJugadores = JSON.parse(data);
        dataJugadores.forEach((jugadorData) => {
            this.agregarJugador(
                jugadorData.id, 
                jugadorData.esTitular, 
                jugadorData.nombre, 
                jugadorData.apellido, 
                jugadorData.edad, 
                jugadorData.numero, 
                jugadorData.idEquipo
                );
        });

    }

    async guardarJugadores() {
        // guardamos los equipos en un archivo json
        const dataJugadores = this.jugadores.map((jugador) => {
            return {
                id: jugador.id,
                esTitular: jugador.esTitular,
                nombre: jugador.nombre,
                apellido: jugador.apellido,
                edad: jugador.edad,
                numero: jugador.numero,
                idEquipo: jugador.idEquipo
            }
        });
        writeFile(this.path, JSON.stringify(dataJugadores)).then().catch()
    }
}

module.exports.JugadorDAO = JugadorDAO;