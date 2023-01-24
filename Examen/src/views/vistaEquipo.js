// vistaEquipo.js es la vista de la entidad Equipo. En ella se gestionan las opciones del menú de Equipo.


const inquirer = require('inquirer');

async function menuEquipo(equipoFutbolDAO){
    let exit = false
    while(!exit) {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'main',
                message: 'Se encuentra en el menú de administración de equipos de futbol ¿Qué desea hacer?',
                choices: [
                    {value: 'listar' , name: 'Listar equipos'},
                    {value: 'listarJugadores' , name: 'Listar jugadores de un equipo'},
                    {value: 'agregar' , name: 'agregar equipo'},
                    {value: 'eliminar' , name: 'eliminar equipo'},
                    {value: 'modificar' , name: 'Modificar equipo'},
                    {value: 'volver' , name: 'Volver al menú principal'},
                ]
            }]
        )

        switch (answers.main) {
            case 'listar':
                console.log(equipoFutbolDAO.listarEquipos())
                break;
            case 'listarJugadores':
                await listarJugadoresEquipo(equipoFutbolDAO)
                break;
            case 'agregar':
                await agregarEquipo(equipoFutbolDAO)
                break;
            case 'eliminar':
                await eliminarEquipo(equipoFutbolDAO)
                break;
            case 'modificar':
                await modificarEquipo(equipoFutbolDAO)
                break;
            case 'volver':
                exit = true;
            default:
                break;
        }
    }
}


async function listarJugadoresEquipo(equipoFutbolDAO){
    let answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'idEquipo',
            message: 'Seleccione el equipo del que desea ver los jugadores',
            choices: equiposChoices(equipoFutbolDAO.listarEquipos())
        }]
    )
    console.log(equipoFutbolDAO.listarJugadoresEquipo(answers.idEquipo))
}

async function agregarEquipo(equipoFutbolDAO){
    //id: int, esLocal: bool, nombre: string, ciudad: string, estadio: string
    const answers = await inquirer.prompt(equiposAtributosChoices(true))
    // verificar que el número sea un entero
    answers.id = parseInt(answers.id)
    equipoFutbolDAO.agregarEquipo(answers.id, answers.esLocal, answers.nombre, answers.ciudad, answers.estadio)
}


async function eliminarEquipo(equipoFutbolDAO){
    if (equipoFutbolDAO.listarEquipos().length === 0){
        console.log('No hay equipos para modificar\n')
        return
    }

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'idEquipo',
            message: 'Seleccione el equipo que desea eliminar',
            choices: equiposChoices(equipoFutbolDAO.listarEquipos())
        }]
    )
    equipoFutbolDAO.eliminarEquipo(answers.idEquipo)
}

async function modificarEquipo(equipoFutbolDAO){
    if (equipoFutbolDAO.listarEquipos().length === 0){
        console.log('No hay equipos para modificar\n')
        return
    }

    const equipoSeleccionado = await inquirer.prompt([
        {
            type: 'list',
            name: 'idEquipo',
            message: 'Seleccione el equipo que desea modificar',
            choices: equiposChoices(equipoFutbolDAO.listarEquipos())
        }]
    )
    console.log(equipoFutbolDAO.obtenerEquipo(equipoSeleccionado.idEquipo))
    const nuevoEquipo = await inquirer.prompt(equiposAtributosChoices())
    nuevoEquipo.id = parseInt(nuevoEquipo.id)
    equipoFutbolDAO.modificarEquipo(equipoSeleccionado.idEquipo, nuevoEquipo.esLocal, nuevoEquipo.nombre, nuevoEquipo.ciudad, nuevoEquipo.estadio)

}

function equiposChoices(listaEquipos){
    return listaEquipos.map(equipo => {
        return {value: equipo.id, name: equipo.nombre}
    });
}

function equiposAtributosChoices(conId = false){
    const arr = [
        {
            type: 'confirm',
            name: 'esLocal',
            message: 'Introduzca si el equipo es local',
        },
        {
            type: 'input',
            name: 'nombre',
            message: 'Introduzca el nombre del equipo',
        },
        {
            type: 'input',
            name: 'ciudad',
            message: 'Introduzca la ciudad del equipo',
        },
        {
            type: 'input',
            name: 'estadio',
            message: 'Introduzca el estadio del equipo',
        },
    ]
    if(conId){
        arr.unshift({
            type: 'input',
            name: 'id',
            message: 'Introduzca el id del equipo',
        })
    }
    return arr
}

module.exports = {
    menuEquipo, equiposChoices
}