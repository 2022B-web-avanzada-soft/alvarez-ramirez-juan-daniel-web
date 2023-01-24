// menu.js es la vista principal de la aplicación. En ella se muestra el menú principal y se gestionan las opciones del mismo.

const inquirer = require('inquirer');
const { menuEquipo } = require('./vistaEquipo');
const { menuJugador } = require('./vistaJugador');

async function menu(jugadorDAO, equipoFutbolDAO){
    let exit = false
    while (!exit){
        await inquirer.prompt([
            {
                type: 'list',
                name: 'main',
                message: 'Bienvenido al sistema de administración de equipos de futbol ¿Qué desea hacer?',
                choices: [
                    {value: 'equipos' , name: 'Administrar equipos'},
                    {value: 'jugadores' , name: 'Administrar jugadores'},
                    {value: 'exit' , name: 'Salir'}
                ]
            }
        ]).then(async answers => {
            console.log(answers.main)
            switch (answers.main) {
                case 'equipos':
                    await menuEquipo(equipoFutbolDAO)
                    break;
                case 'jugadores':
                    await menuJugador(jugadorDAO, equipoFutbolDAO)
                    break;
                case 'exit':
                    exit = true;
                    break;
                default:
                    break;
            }
        });
    }
}

module.exports = {
    menu
}