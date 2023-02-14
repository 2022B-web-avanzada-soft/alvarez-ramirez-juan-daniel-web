const fs = require('fs');

function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (error, contenidoArchivo) => {
            if (error) {
                reject(error);
            } else {
                resolve(contenidoArchivo);
            }
        });
    });
}


async function asyncAwaitUno(path) {
    try {
        const respuestaContenidoArchivoOriginal = await readFile(path).then().catch((e) => console.log(e));
        console.log(respuestaContenidoArchivoOriginal);
    }
    catch (error) {
    }
}

const asyncAwaitDos = async function () {
    console.log("hola")
}

const asyncAwaitTres = async () => {
}

asyncAwaitUno('./01-variables.js')
asyncAwaitDos()