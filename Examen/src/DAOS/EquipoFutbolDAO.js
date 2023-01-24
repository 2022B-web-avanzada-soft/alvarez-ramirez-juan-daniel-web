// DAO de la entidad EquipoFutbol

const { EquipoFutbol } = require('../entities/EquipoFutbol');
const {JugadorDAO} = require("./JugadorDAO")
const {readFile} = require("../fileManager/readFile")
const {writeFile} = require("../fileManager/writeFile")

class EquipoFutbolDAO {
    constructor(path, JugadorDAO) {
        this.equipos = [];
        this.path = path;
        this.jugadorDAO = JugadorDAO;
    }

    agregarEquipo(id, esLocal, nombre, ciudad, estadio) {
        if (this.equipos.find((j) => j.id === id)) {
            console.log("Un equipo con ese id ya existe\n");
            return;
        }
        const equipo = new EquipoFutbol(id, esLocal, nombre, ciudad, estadio);
        this.equipos.push(equipo);
    }

    eliminarEquipo(id) {
        this.equipos = this.equipos.filter((e) => e.id !== id);
        // eliminamos los jugadores asociados al equipo
        this.jugadorDAO.listarJugadores().forEach((j) => {
            if (j.idEquipo === id) {
                this.jugadorDAO.eliminarJugador(j.id);
            }
        });
    }

    modificarEquipo(id, esLocal, nombre, ciudad, estadio) {
        const equipo = this.equipos.find((e) => e.id === id);
        equipo.esLocal = esLocal;
        equipo.nombre = nombre;
        equipo.ciudad = ciudad;
        equipo.estadio = estadio;
    }

    obtenerEquipo(id) {
        return this.equipos.find((e) => e.id === id);
    }

    listarEquipos() {
        return this.equipos;
    }

    listarJugadoresEquipo(idEquipo) {
        return this.jugadorDAO.listarJugadores().filter((j) => j.idEquipo === idEquipo);
    }

    async cargarEquipos() {
        // cargamos un archivo json que contiene todos los datos de los equipos
        const data = await readFile(this.path)
        const dataEquipos = JSON.parse(data);
        dataEquipos.forEach((equipoData) => {
            this.agregarEquipo(
                equipoData.id, 
                equipoData.esLocal, 
                equipoData.nombre, 
                equipoData.ciudad, 
                equipoData.estadio
                );
        });
    }

    async guardarEquipos() {
        // guardamos los equipos en un archivo json
        const dataEquipos = this.equipos.map((equipo) => {
            return {
                id: equipo.id,
                esLocal: equipo.esLocal,
                nombre: equipo.nombre,
                ciudad: equipo.ciudad,
                estadio: equipo.estadio
            }
        });
        writeFile(this.path, JSON.stringify(dataEquipos))
        .then()
        .catch()
    }
}

module.exports.EquipoFutbolDAO = EquipoFutbolDAO;