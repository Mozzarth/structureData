// Las colas o filas son estructuras de datos como las de un supermercado, el primero que llegue a caja se le procesa la compra
//  y luego de haber terminado la transaccion continua el siguiente. si llega alguien nuevo se debe
//  formar en la ultima pocision de la cola.

// El primero en llegar, el primero en salir (first out first in)

// Con lo antes mensionado podemos hacernos una idea de cual es la función de esta estructura de datos.
// Insertar procesos uno tras otros y liberar la cola luego de ser procesados en orden de inserción.

// Las colas se pueden componer de una lista enlazada tambien.

// El siguiente ejemplo realiza una cola compuestas por una lista enlazada de clientes
//  para efectuar un pago, implemento promesas para simular 
// la demora de alguna tranzacción externa.

interface ColaClientes {
    encolar(idClinet: Number): Boolean
    procesoActual(): Cliente | null
    procesar(): Promise<any>
}



class Cliente {
    readonly idCliente: number;
    private pago: boolean

    constructor(id: number) {
        this.idCliente = id
        this.pago = false
    }

    async pagar(): Promise<boolean> {
        return new Promise((resolve: any) => {
            setTimeout(() => {
                this.pago = true
                console.log(`EL cliente ${this.idCliente} ha pagado`)
                resolve(true)
            }, 1000 * this.idCliente)
        })

    }

}


class NodoCliente {
    object: Cliente;
    next: NodoCliente | null;

    constructor(idClient: number) {
        this.object = new Cliente(idClient)
        this.next = null
    }

}


class Caja implements ColaClientes {
    private head: NodoCliente | null
    private cola: NodoCliente | null
    private size: number
    private procesando: boolean

    constructor() {
        this.procesando = false
        this.head = null
        this.cola = null
        this.size = 0
    }
    encolar(idCliente: number): Boolean {
        const newNodo = new NodoCliente(idCliente)
        let current = this.head
        do {
            if (current == null) {
                this.head = newNodo
                this.size++
                console.log("Nuevo proceso agregado...")
                return true
            } else if (current.next == null) {
                current.next = newNodo
                this.size++
                console.log("Nuevo proceso agregado...")
                return true
            }
            current = current.next
            this.cola = newNodo
            this.procesar()
        } while (current);
        return false
    }
    procesoActual(): Cliente | null {
        return this.head == null ? null : this.head.object
    }
    async procesar() {
        if (this.procesando) { return }
        let current = this.head
        this.procesando = true
        do {
            if (current == null) { return }
            console.log(`Procesando... ${current.object.idCliente}`)
            await current.object.pagar()
            current = current.next
            this.head = current == null ? null : current.next
            this.size--
        } while (current);
        this.procesando = false
        return true
    }
    print() {
        let current = this.head
        let cadena = ""
        do {
            if (current == null) { break }
            cadena += ` ${current.object.idCliente}-> `
            current = current.next
        } while (current);
        return cadena + "X"
    }
    anularProceso(index: number) {
        if (index < 0 || index > this.size) { return false }
        let current = this.head
        let previus: NodoCliente | null = null
        let contador = 0
        while (current) {
            let find = index == contador
            if (index == contador) {
                this.head = current.next
                console.log("anulado", current.object.idCliente)
                current = null
                return true
            } else if (find) {
                if (previus == null) { break }
                previus.next = current.next
                console.log("anulado", current.object.idCliente)
                current = null
                return true
            }
            previus = current
            current = current.next
        }
        return false

    }
}


const colaEnCaja = new Caja()
colaEnCaja.encolar(1)
colaEnCaja.encolar(2)
colaEnCaja.encolar(3)
console.log(colaEnCaja.print())
colaEnCaja.anularProceso(2)
colaEnCaja.encolar(4)
colaEnCaja.encolar(5)
console.log(colaEnCaja.print())
console.log(colaEnCaja.procesoActual())
setTimeout(() => { console.log(colaEnCaja.procesoActual()) }, 4000);