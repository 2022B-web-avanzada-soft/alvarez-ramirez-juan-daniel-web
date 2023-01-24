// Description: Función que lee un archivo y retorna su contenido

const fs = require('fs');

function writeFile(path, contenidoArchivo) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, contenidoArchivo, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(contenidoArchivo);
            }
        });
    });
}

module.exports = {
    writeFile
}