//06-ejemplo.txt -> Hola

// 1) Leer el archivo 06-ejemplo.txt
// 2) Despues del paso 1, Leer el archivo 01-variable.js
// ,luego imprimir en consola
// 3) Crear un nuevo archivo llamado 06-nuevo-archivo.txt
// con el contenido de los otros dos archivos
const fs = require('fs');

console.log("Primero"); 
fs.readFile(
    '06-ejemplo.txt',
    'utf-8',
    (error, contenido06Ejemplo) => {
        if (error) {
            console.error('Hubo error', error);
        } else {
            console.log('Contenido archivo', contenido06Ejemplo);
            fs.readFile(
                '01-variables.js',
                'utf-8',
                (error, contenido01Variables) => {
                    if (error) {
                        console.error('Hubo error', error);
                    } else {
                        console.log('Contenido archivo', contenido01Variables);
                        fs.writeFile(
                            '06-nuevo-archivo.txt',
                            contenido01Variables+"\n"+contenido06Ejemplo,
                            (error) => {
                                if (error) {
                                    console.error('Hubo error', error);
                                } else {
                                    console.log('Archivo creado');
                                }
                            }
                        );
                    }
                }
            );
        }
    }
)