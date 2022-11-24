
const funcionFatArrow1 = () => {};
let funcionFatArrow2 = () => {};
var funcionFatArrow3 = () => {};

const funcionAnonima1 = function () {};
let funcionAnonima2 = function () {};
var funcionAnonima3 = function () {};

function funcionDeclarada1() {}
function funcionDeclarada2() {}
function funcionDeclarada3() {}

const functionFatArrow6 = (parametro) => parametro + 1;
const functionFatArrow7 = (parametro) => {
  return parametro + 1;
}
const funcionFatArrow8 = param => param + 1;


// funcion de infinitos parametros
const funcionInfinitosParametros = (...parametros) => {
  console.log(parametros);
}

const sumarNumeros = (...numeros) => {
    return numeros.reduce(
        (valorAcumulado = 0, valorActual) => {
            return valorAcumulado + valorActual;
        }
    );
}

console.log(sumarNumeros(1,2,3,4,5,6,7,8,9,10));