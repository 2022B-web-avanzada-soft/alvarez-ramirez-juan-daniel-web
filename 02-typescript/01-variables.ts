let nombre:string = 'Juan' // primitiva
let nombre2:String = 'Juan' // clase String

// nombre = 1

let edad:number = 32;
let casado:boolean = false;
let fecha:Date = new Date();

let numero = 3
let letra = 'a'
let variable: number | string | Date = 5
variable = '2'
console.log((variable as unknown as number))