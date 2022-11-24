// 05-destrucuturacion.js
// Desestructuracion de objetos -> orden SI importa
const adrian = {
    nombre: 'Adrian',
    edad: 28,
}
const carolina = {
    nombre: 'Carolina',
    edad: 27,
}
const adrianCarolina = {
    ...adrian,
    ...carolina,
}

console.log(adrianCarolina);

const carolinaAdrian = {
    ...carolina,
    ...adrian,
}
console.log(carolinaAdrian);

// deestructuracion de arreglos -> orden SI importa
const arregloNumerosUno = [1, 2, 3, 4, 5];
const arregloNumerosDos = [6, 7, 8, 9, 10];

const arregloNumerosCinco = [
    ...arregloNumerosUno,
    ...arregloNumerosDos,
];
console.log(arregloNumerosCinco);

const arregloNumerosSeis = [
    ...arregloNumerosDos,
    ...arregloNumerosUno,
];
console.log(arregloNumerosSeis);