// /01-javascript
// /01-javascript/01-variables.js

// mutables (re asignadas ) e inmutables
var numeroUno = 1;
var numeroDos = 2;
numeroUno = 12;
numeroDos = 8;
numeroUno = false;
numeroDos = true;

// inmutables
const configuracionArchivos = "PDF";
// configuracionArchivos = "XML";
// vamos a preferir usar const > let > nunca var!

// tipos de varialbes (primitivos)
const numero = 1; // number
const sueldo = 1.2; // number
const texto = "Juan"; // string
const apellido = 'Alvarez'; // string
const booleano = false; // boolean
const hijos = null; // object
const zapatos = undefined; // undefined

console.log(typeof numero);
console.log(typeof sueldo);
console.log(typeof texto);
console.log(typeof apellido);
console.log(typeof booleano);
console.log(typeof hijos);
console.log(typeof zapatos);