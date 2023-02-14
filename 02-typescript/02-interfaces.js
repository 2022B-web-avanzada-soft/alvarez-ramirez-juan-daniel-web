"use strict";
exports.__esModule = true;
exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
var userJuan = {
    nombre: 'Juan',
    apellido: 'Alvarez',
    edad: 22,
    casado: false,
    imprimirUsuario: function (mensaje) {
        return 'El mensjae es: ' + mensaje;
    },
    calcularImpuesto: function (impuesto) {
        return userJuan.sueldo;
    }
};
