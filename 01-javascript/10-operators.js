// Find sirve para encontrar un elemento que cumpla con la condición que necesitamos 
// ForEach sirve para iterar entre un arreglo 
// Map sirve para crear un arreglo en base a otro 
// Filter construye un nuevo arreglo con los elementos que cumplen con una condición 
// Some nos sirve para verificar si existe al menos un elemento que cumple con la condición 
// Every nos sirve para verificar si todos los elementos cumplen con la condición 
// Reduce nos sirve para realizar una operación y obtener un solo resultado de un arreglo de izquierda a derecha 
// ReduceRight nos sirve para realizar una operación y obtener un solo resultado de un arreglo de derecha a izquierda 

array = [1,2,3,4,5,6,7,8,9,10]

// Find
const find = array.find((valorActual, indiceActual, arreglo) => {
    return valorActual === 5
})

// ForEach
array.forEach((valorActual, indiceActual, arreglo) => {
    console.log(valorActual)
})

// Map
const map = array.map((valorActual, indiceActual, arreglo) => {
    return valorActual * 2
})

// Filter
const filter = array.filter((valorActual, indiceActual, arreglo) => {
    return valorActual > 5
})

// Some
const some = array.some((valorActual, indiceActual, arreglo) => {
    return valorActual > 5
})

// Every
const every = array.every((valorActual, indiceActual, arreglo) => {
    return valorActual > 5
})

// Reduce
const reduce = array.reduce((valorAcumulado, valorActual, indiceActual, arreglo) => {
    return valorAcumulado + valorActual
})

// ReduceRight
const reduceRight = array.reduceRight((valorAcumulado, valorActual, indiceActual, arreglo) => {
    return valorAcumulado + valorActual
})

// En conclusión los operadores nos sirven para realizar operaciones con los datos que tenemos en nuestro código, ya sea para iterar, filtrar, crear nuevos arreglos, etc.