
const inquirer = require('inquirer')

async function main() {
    try {
        const respuesta = await inquirer.prompt({
            type: 'input',
            name: 'nombre',
            message: '¿Cuál es tu nombre?',
        })
        console.log('respuesta', respuesta)
        const respuesta2 = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'nombre',
                    message: '¿Cuál es tu apellido?',
                },
                {
                    type: 'input',
                    name: 'nombre',
                    message: '¿Cuál es tu edad?',
                }
            ])
        console.log('respuesta', respuesta2)
    }
    catch (error) {
        console.log('error', error)
    }
}
main()