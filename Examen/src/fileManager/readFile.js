// Description: Función que lee un archivo y retorna su contenido

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

module.exports = {
    readFile
}