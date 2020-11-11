//  LISTAS ENLAZADAS 
// Existen diferentes tipos de listas:
// Enlazadas simples, doblemente enlazadas , circulares , circulares doblemente enlazadas.
// Estas constan de un nodo el cual es una estructura que almacena cualquier tipo de dato definido
// y posee un apuntador o referencia de memoria al nodo siguiente o al anterior en caso de ser una lista enlazada doble.
// Estas listas tienen una cabeza la cual es una referencia al primer Nodo. esta cabeza se hace referencia
// desde la estructura que maneja la lista
// 
// En el siguiente ejemplo orientado a listas simple vemos dos clases: 
// * Nodo que representa nuestro nodo. nuestro apuntador es la propiedad .next
// * LinkedList la cual tiene metodos para insertar y anular nodos 

class Nodo {
    data: any
    next: any

    constructor(data: any) {
        this.data = data
        this.next = null
    }
}

class LinkedList {
    head: null | any
    size: number

    constructor() {
        this.head = null
        this.size = 0
    }

    add(data: number) {
        let current = this.head
        let newNodo = new Nodo(data)
        if (data == undefined) { return }

        // Primero
        if (current == null) {
            this.head = newNodo
            this.size++
            return
        }
        // Siguientes
        while (current != null) {
            if (current.next == null) {
                current.next = newNodo
                this.size++
                return
            }
            current = current.next
        }
    }

    addIn(data: any, index: number) {
        // if (index < 0 || data == undefined || index > this.size) { return false }
        // Aca no valido el tamaño porque a fuerza si mando un tamaño superior lo meto en el ultimo.
        if (index < 0 || data == undefined) { return false }
        const newNodo = new Nodo(data)
        let current = this.head
        let previus = null
        let contador = 0

        while (current) {
            let found = index == contador
            if (found && previus == null) {
                newNodo.next = this.head
                this.head = newNodo
                this.size++
                return true
            } else if (found) {
                previus.next = newNodo
                newNodo.next = current
                this.size++
                return true
            } else if ((this.size - 1) == contador) {
                current.next = newNodo
                return true
            }
            console.log(contador)
            previus = current
            current = current.next
            contador++
        }
    }

    print() {
        let current = this.head
        let string = ""
        while (current) {
            string += `${current.data} -> `
            current = current.next
        }
        string += `X`
        return string

    }

    deleteAt(data: number) {
        let current = this.head
        let previus = null
        if (data == undefined || current == null) { return null }
        while (current) {
            if (current.data == data && previus == null) {
                this.head = current.next
                this.size--
                return true
            } else if (current.data == data) {
                previus.next = current.next
                this.size--
                return true
            }
            previus = current
            current = current.next
        }
        return false
    }
    deleteOf(index: number) {
        let current = this.head
        let previus = null
        let contador = 0

        if (current == null || index > this.size) { return false }
        while (current) {
            let found = index == contador
            if (found && previus == null) {
                this.head = current.next
                this.size--
                return true
            } else if (found) {
                previus.next = current.next
                current = null
                this.size--
                return true
            }
            previus = current
            current = current.next
            contador++
        }
        return false

    }
}



const list = new LinkedList()
list.add(1)
list.add(2)
list.add(3)
list.add(4)
list.add(5)
list.add(6)
list.add(7)
console.log(list.size)
console.log(list.deleteAt(1))
console.log(list.print())
console.log(list.deleteAt(2))
console.log(list.print())
console.log(list.deleteAt(5))
console.log(list.print())
console.log(list.deleteOf(1))
console.log(list.print())
console.log(list.deleteOf(1))
console.log(list.print())
console.log(list.deleteOf(0))
console.log(list.print())
console.log(list.addIn(8, 0))
console.log(list.print())
console.log(list.addIn(9, 1))
console.log(list.print())
console.log(list.addIn(10, 111))
console.log(list.print())
console.log(list.size)


