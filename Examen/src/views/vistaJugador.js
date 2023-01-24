// vistaJugador.js es la vista de la entidad Jugador. En ella se gestionan las opciones del menú de Jugador.

const { equiposChoices } = require("./vistaEquipo");
const inquirer = require('inquirer');

async function menuJugador(jugadorDAO, equipoFutbolDAO){
    let exit = false
    if( equipoFutbolDAO.listarEquipos().length == 0){
        console.log("No hay equipos creados. Por favor, cree un equipo antes de crear un jugador")
        return
    }
    while(!exit) {
        let answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'main',
                message: 'Se encuentra en el menú de administración de jugadores ¿Qué desea hacer?',
                choices: [
                    {value: 'listar' , name: 'Listar jugadores'},
                    {value: 'agregar' , name: 'agregar jugador'},
                    {value: 'eliminar' , name: 'eliminar jugador'},
                    {value: 'modificar' , name: 'Modificar jugador'},
                    {value: 'volver' , name: 'Volver al menú principal'},
                ]
            }
        ])
        switch (answers.main) {
            case 'listar':
                await listarJugadores(jugadorDAO, equipoFutbolDAO)
                break;
            case 'agregar':
                await agregarJugador(jugadorDAO, equipoFutbolDAO)
                break;
            case 'eliminar':
                await eliminarJugador(jugadorDAO, equipoFutbolDAO)
                break;
            case 'modificar':
                await modificarJugador(jugadorDAO, equipoFutbolDAO)
                break;
            case 'volver':
                exit = true;
                break;
            default:
                break;
        }
    }
}

async function listarJugadores(jugadorDAO, equipoFutbolDAO){
    console.log(jugadorDAO.listarJugadores().map(jugador => {
        const equipo = equipoFutbolDAO.obtenerEquipo(jugador.idEquipo)
        return {
            id: jugador.id,
            nombre: jugador.nombre,
            apellido: jugador.apellido,
            edad: jugador.edad,
            numero: jugador.numero,
            esTitular: jugador.esTitular,
            equipo: equipo.nombre? equipo.nombre : "Equipo no encontrado"
        }
    }));
}


async function agregarJugador(jugadorDAO, equipoFutbolDAO){
    let answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'idEquipo',
            message: 'Introduzca el equipo del jugador',
            choices: equiposChoices(equipoFutbolDAO.listarEquipos())
        }
    ])
    let jugador = await inquirer.prompt(jugadoresAtributosChoices(true))
    jugadorDAO.agregarJugador(jugador.id, jugador.esTitular, jugador.nombre, jugador.apellido, jugador.edad, jugador.numero, answers.idEquipo)
}

async function eliminarJugador(jugadorDAO){
    if (jugadorDAO.listarJugadores().length === 0) {
        console.log("No hay jugadores creados. Por favor, cree un jugador antes de modificarlo\n")
        return
    }

    answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Introduzca el jugador a eliminar',
            choices: jugadoresChoices(jugadorDAO.listarJugadores())
        }
    ])
    jugadorDAO.eliminarJugador(answers.id)
        
}

async function modificarJugador(jugadorDAO, equipoFutbolDAO){
    if (jugadorDAO.listarJugadores().length === 0) {
        console.log("No hay jugadores creados. Por favor, cree un jugador antes de modificarlo\n")
        return
    }

    let jugadorSeleccionado = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Introduzca el jugador a modificar',
            choices: jugadoresChoices(jugadorDAO.listarJugadores())
        }
    ])
    let jugadorModificado = await inquirer.prompt(jugadoresAtributosChoices())
    let equipo = await inquirer.prompt([
        {
            type: 'list',
            name: 'idEquipo',
            message: 'Introduzca el equipo del jugador',
            choices: equiposChoices(equipoFutbolDAO.listarEquipos())
        }
    ])
    
    jugadorDAO.modificarJugador(
        jugadorSeleccionado.id, 
        jugadorModificado.esTitular, 
        jugadorModificado.nombre, 
        jugadorModificado.apellido, 
        jugadorModificado.edad, 
        jugadorModificado.numero,
        equipo.idEquipo
    )
}

function jugadoresChoices(jugadores){
    let choices = []
    jugadores.forEach(jugador => {
        choices.push({value: jugador.id, name: jugador.nombre})
    });
    return choices
}

function jugadoresAtributosChoices(conId = false){
    const arr = [
        {
            type: 'confirm',
            name: 'esTitular',
            message: 'Introduzca si el jugador es titular',
        },
        {
            type: 'input',
            name: 'nombre',
            message: 'Introduzca el nombre del jugador',
        },
        {
            type: 'input',
            name: 'apellido',
            message: 'Introduzca el apellido del jugador',
        },
        {
            type: 'number',
            name: 'edad',
            message: 'Introduzca la edad del jugador',
        },
        {
            type: 'number',
            name: 'numero',
            message: 'Introduzca el numero del jugador',
        }
    ]
    if(conId){
        arr.unshift({
            type: 'input',
            name: 'id',
            message: 'Introduzca el id del jugador',
        })
    }
    return arr
}


module.exports = {
    menuJugador
}