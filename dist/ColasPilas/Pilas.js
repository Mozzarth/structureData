"use strict";
// La particularidad de una estructura de datos de cola es el hecho de que sólo podemos acceder al primer y 
// al último elemento de la estructura.Así mismo, los elementos sólo se pueden eliminar por el principio y 
// sólo se pueden añadir por el final de la cola.
var NodoPersona = /** @class */ (function () {
    function NodoPersona(persona) {
        this.data = persona;
        this.next = null;
    }
    return NodoPersona;
}());
var Cola = /** @class */ (function () {
    function Cola() {
        this.head = null;
        this.cola = null;
        this.size = 0;
    }
    Cola.prototype.add = function (Persona) {
        var nod = new NodoPersona(Persona);
        if (this.head == null) {
            this.head = nod;
        }
        else {
            if (this.head.next == null) {
                this.head.next = nod;
                this.cola = nod;
            }
            else {
                this.cola.next = nod;
                this.cola = nod;
            }
        }
        this.size++;
    };
    Cola.prototype.print = function () {
        var string = "";
        var current = this.head;
        while (current) {
            string = string.concat(current.data.id.toString() + "=>");
            current = current.next;
        }
        return string.concat("X");
    };
    return Cola;
}());
var Persona = /** @class */ (function () {
    function Persona(id) {
        this.id = id;
    }
    return Persona;
}());
var colaHospital = new Cola();
// colaHospital.add(new Persona(1))
// colaHospital.add(new Persona(2))
// colaHospital.add(new Persona(3))
// colaHospital.add(new Persona(4))
// colaHospital.add(new Persona(5))
// console.log(colaHospital.print())
// console.log(colaHospital)
var label = document.getElementById("pilaLabel");
var input = document.getElementById("txtPersona");
input.addEventListener("keypress", function (e) {
    if (e.code == "Enter") {
        add(Number(input.value));
    }
});
function printBody() {
    return colaHospital.print();
}
function add(id) {
    if (isNaN(id)) {
        alert("isNan");
        return input.value = "";
    }
    colaHospital.add(new Persona(id));
    label.innerHTML = printBody();
    input.value = "";
}
