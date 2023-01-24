// main: archivo principal de la aplicación

const inquirer = require('inquirer');
const { EquipoFutbolDAO } = require("./DAOS/EquipoFutbolDAO")
const { JugadorDAO } = require("./DAOS/JugadorDAO")
const { menu } = require("./views/menu")

async function main(){
    // cargamos los datos de los jugadores y equipos
    const jugadorDAO = new JugadorDAO("./data/Jugador.json");
    await jugadorDAO.cargarJugadores().then().catch();
    const equipoFutbolDAO = new EquipoFutbolDAO("./data/EquipoFutbol.json", jugadorDAO);
    await equipoFutbolDAO.cargarEquipos().then().catch();

    await menu(jugadorDAO, equipoFutbolDAO);

    console.log("Guardando datos...");
    // guardamos los datos de los jugadores y equipos
    await jugadorDAO.guardarJugadores();
    await equipoFutbolDAO.guardarEquipos();
}

main()
