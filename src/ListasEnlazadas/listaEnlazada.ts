class Libro {
    readonly id: number
    constructor(id: number) {
        this.id = id
    }
    imprimir() {
        return new Promise((res: any, rej: any) => {
            setTimeout(() => {
                res(`Impreso libro ${this.id}`)
            }, 1000);
        })
    }
}

class NodoLibro {
    data: Libro
    next: NodoLibro | null
    constructor(libro: Libro) {
        this.data = libro
        this.next = null
    }
}

class ListaLibros {
    cabeza: NodoLibro | null
    size: number

    constructor() {
        this.cabeza = null
        this.size = 0
    }

    private addCabeza(newNodo: NodoLibro) {
        newNodo.next = this.cabeza
        this.cabeza = newNodo
        this.size++
        return true
    }
    add(libro: Libro) {
        const newNodo = new NodoLibro(libro)
        let current = this.cabeza
        while (current) {
            if (current.next == null) {
                current.next = newNodo
                this.size++
                return true
            }
            current = current.next
        }
        return this.addCabeza(newNodo)
        // this.cabeza = newNodo
        // this.size++
        // return true
    }
    addIn(index: number, libro: Libro) {
        const newNodo = new NodoLibro(libro)
        if (index < 0) { return false }
        let current = this.cabeza
        let contador = 0
        let previus: NodoLibro | null = null
        do {
            let encontrado = index == contador
            if (encontrado && previus == null) { return this.addCabeza(newNodo) }
            if (encontrado) {
                previus.next = newNodo
                newNodo.next = current
                return true
            }
            contador++
            previus = current
            current = current.next
        } while (current);
        previus.next = newNodo
        return true
    }

    get(idLibro: number) {
        let current = this.cabeza
        while (current) {
            let encontrado = idLibro == current.data.id
            if (encontrado) { return current.data }
            current = current.next
        }
        return false
    }
    print() {
        let current = this.cabeza
        let cadena = ''
        while (current) {
            cadena += ` ${current.data.id} => `
            current = current.next
        } return cadena += "X"
    }

    delete(idLibro: number) {
        let current = this.cabeza
        let previus: null | NodoLibro
        if (current == null) { return false }
        while (current) {
            let encontrado = current.data.id == idLibro
            if (encontrado && previus == null) {
                this.cabeza = null
                this.cabeza = current.next
                return true
            } else if (encontrado) {
                previus.next = current.next
            }
            previus = current
            current = current.next
        }
        return false

    }

}


const listaLibros = new ListaLibros()

listaLibros.add(new Libro(2))
listaLibros.add(new Libro(3))
listaLibros.add(new Libro(4))
listaLibros.addIn(0, new Libro(1))
listaLibros.addIn(88, new Libro(5))
listaLibros.add(new Libro(6))
listaLibros.addIn(8, new Libro(7))

console.log(listaLibros.print())
console.log(listaLibros.size)

console.log(listaLibros.get(6))
console.log(listaLibros.get(8))
console.log(listaLibros.get(1))
console.log(listaLibros.delete(7))
console.log(listaLibros.delete(6))
console.log(listaLibros.delete(1))
console.log(listaLibros.print())
//



