"use strict";
// Las colas o filas son estructuras de datos como las de un supermercado, el primero que llegue a caja se le procesa la compra
//  y luego de haber terminado la transaccion continua el siguiente. si llega alguien nuevo se debe
//  formar en la ultima pocision de la cola.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Cliente = /** @class */ (function () {
    function Cliente(id) {
        this.idCliente = id;
        this.pago = false;
    }
    Cliente.prototype.pagar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            _this.pago = true;
                            console.log("EL cliente " + _this.idCliente + " ha pagado");
                            resolve(true);
                        }, 1000 * _this.idCliente);
                    })];
            });
        });
    };
    return Cliente;
}());
var NodoCliente = /** @class */ (function () {
    function NodoCliente(idClient) {
        this.object = new Cliente(idClient);
        this.next = null;
    }
    return NodoCliente;
}());
var Caja = /** @class */ (function () {
    function Caja() {
        this.procesando = false;
        this.head = null;
        this.cola = null;
        this.size = 0;
    }
    Caja.prototype.encolar = function (idCliente) {
        var newNodo = new NodoCliente(idCliente);
        var current = this.head;
        do {
            if (current == null) {
                this.head = newNodo;
                this.size++;
                console.log("Nuevo proceso agregado...");
                return true;
            }
            else if (current.next == null) {
                current.next = newNodo;
                this.size++;
                console.log("Nuevo proceso agregado...");
                return true;
            }
            current = current.next;
            this.cola = newNodo;
            this.procesar();
        } while (current);
        return false;
    };
    Caja.prototype.procesoActual = function () {
        return this.head == null ? null : this.head.object;
    };
    Caja.prototype.procesar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var current;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.procesando) {
                            return [2 /*return*/];
                        }
                        current = this.head;
                        this.procesando = true;
                        _a.label = 1;
                    case 1:
                        if (current == null) {
                            return [2 /*return*/];
                        }
                        console.log("Procesando... " + current.object.idCliente);
                        return [4 /*yield*/, current.object.pagar()];
                    case 2:
                        _a.sent();
                        current = current.next;
                        this.head = current == null ? null : current.next;
                        this.size--;
                        _a.label = 3;
                    case 3:
                        if (current) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        this.procesando = false;
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Caja.prototype.print = function () {
        var current = this.head;
        var cadena = "";
        do {
            if (current == null) {
                break;
            }
            cadena += " " + current.object.idCliente + "-> ";
            current = current.next;
        } while (current);
        return cadena + "X";
    };
    Caja.prototype.anularProceso = function (index) {
        if (index < 0 || index > this.size) {
            return false;
        }
        var current = this.head;
        var previus = null;
        var contador = 0;
        while (current) {
            var find = index == contador;
            if (index == contador) {
                this.head = current.next;
                console.log("anulado", current.object.idCliente);
                current = null;
                return true;
            }
            else if (find) {
                if (previus == null) {
                    break;
                }
                previus.next = current.next;
                console.log("anulado", current.object.idCliente);
                current = null;
                return true;
            }
            previus = current;
            current = current.next;
        }
        return false;
    };
    return Caja;
}());
var colaEnCaja = new Caja();
colaEnCaja.encolar(1);
colaEnCaja.encolar(2);
colaEnCaja.encolar(3);
console.log(colaEnCaja.print());
colaEnCaja.anularProceso(2);
colaEnCaja.encolar(4);
colaEnCaja.encolar(5);
console.log(colaEnCaja.print());
console.log(colaEnCaja.procesoActual());
setTimeout(function () { console.log(colaEnCaja.procesoActual()); }, 4000);
