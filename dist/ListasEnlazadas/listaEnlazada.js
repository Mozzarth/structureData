"use strict";
var Libro = /** @class */ (function () {
    function Libro(id) {
        this.id = id;
    }
    Libro.prototype.imprimir = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            setTimeout(function () {
                res("Impreso libro " + _this.id);
            }, 1000);
        });
    };
    return Libro;
}());
var NodoLibro = /** @class */ (function () {
    function NodoLibro(libro) {
        this.data = libro;
        this.next = null;
    }
    return NodoLibro;
}());
var ListaLibros = /** @class */ (function () {
    function ListaLibros() {
        this.cabeza = null;
        this.size = 0;
    }
    ListaLibros.prototype.addCabeza = function (newNodo) {
        newNodo.next = this.cabeza;
        this.cabeza = newNodo;
        this.size++;
        return true;
    };
    ListaLibros.prototype.add = function (libro) {
        var newNodo = new NodoLibro(libro);
        var current = this.cabeza;
        while (current) {
            if (current.next == null) {
                current.next = newNodo;
                this.size++;
                return true;
            }
            current = current.next;
        }
        return this.addCabeza(newNodo);
        // this.cabeza = newNodo
        // this.size++
        // return true
    };
    ListaLibros.prototype.addIn = function (index, libro) {
        var newNodo = new NodoLibro(libro);
        if (index < 0) {
            return false;
        }
        var current = this.cabeza;
        var contador = 0;
        var previus = null;
        do {
            var encontrado = index == contador;
            if (encontrado && previus == null) {
                return this.addCabeza(newNodo);
            }
            if (encontrado) {
                previus.next = newNodo;
                newNodo.next = current;
                return true;
            }
            contador++;
            previus = current;
            current = current.next;
        } while (current);
        previus.next = newNodo;
        return true;
    };
    ListaLibros.prototype.get = function (idLibro) {
        var current = this.cabeza;
        while (current) {
            var encontrado = idLibro == current.data.id;
            if (encontrado) {
                return current.data;
            }
            current = current.next;
        }
        return false;
    };
    ListaLibros.prototype.print = function () {
        var current = this.cabeza;
        var cadena = '';
        while (current) {
            cadena += " " + current.data.id + " => ";
            current = current.next;
        }
        return cadena += "X";
    };
    ListaLibros.prototype.delete = function (idLibro) {
        var current = this.cabeza;
        var previus;
        if (current == null) {
            return false;
        }
        while (current) {
            var encontrado = current.data.id == idLibro;
            if (encontrado && previus == null) {
                this.cabeza = null;
                this.cabeza = current.next;
                return true;
            }
            else if (encontrado) {
                previus.next = current.next;
            }
            previus = current;
            current = current.next;
        }
        return false;
    };
    return ListaLibros;
}());
var listaLibros = new ListaLibros();
listaLibros.add(new Libro(2));
listaLibros.add(new Libro(3));
listaLibros.add(new Libro(4));
listaLibros.addIn(0, new Libro(1));
listaLibros.addIn(88, new Libro(5));
listaLibros.add(new Libro(6));
listaLibros.addIn(8, new Libro(7));
console.log(listaLibros.print());
console.log(listaLibros.size);
console.log(listaLibros.get(6));
console.log(listaLibros.get(8));
console.log(listaLibros.get(1));
console.log(listaLibros.delete(7));
console.log(listaLibros.delete(6));
console.log(listaLibros.delete(1));
console.log(listaLibros.print());
//
