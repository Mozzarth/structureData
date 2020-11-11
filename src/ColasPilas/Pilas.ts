// La particularidad de una estructura de datos de cola es el hecho de que sólo podemos acceder al primer y 
// al último elemento de la estructura.Así mismo, los elementos sólo se pueden eliminar por el principio y 
// sólo se pueden añadir por el final de la cola.


class NodoPersona {
    data: Persona
    next: NodoPersona
    constructor(persona: Persona) {
        this.data = persona
        this.next = null
    }
}

class Cola {
    private cola: null | NodoPersona
    private head: null | NodoPersona
    private size: number
    constructor() {
        this.head = null
        this.cola = null
        this.size = 0
    }
    add(Persona: Persona) {
        const nod = new NodoPersona(Persona)
        if (this.head == null) {
            this.head = nod
        } else {
            if (this.head.next == null) {
                this.head.next = nod
                this.cola = nod
            } else {
                this.cola.next = nod
                this.cola = nod
            }
        }
        this.size++
    }

    print() {
        let string = ""
        let current = this.head
        while (current) {
            string = string.concat(current.data.id.toString() + "=>")
            current = current.next
        }
        return string.concat("X")
    }
}


class Persona {
    readonly id: number
    constructor(id: number) {
        this.id = id
    }
}


const colaHospital = new Cola()
// colaHospital.add(new Persona(1))
// colaHospital.add(new Persona(2))
// colaHospital.add(new Persona(3))
// colaHospital.add(new Persona(4))
// colaHospital.add(new Persona(5))

// console.log(colaHospital.print())
// console.log(colaHospital)
const label = document.getElementById("pilaLabel")
const input: any = document.getElementById("txtPersona")


input.addEventListener("keypress", (e: any) => {
    if (e.code == "Enter") {
        add(Number(input.value))
    }
})


function printBody() {
    return colaHospital.print()
}
function add(id: number) {
    if (isNaN(id)) {
        alert("isNan")
        return input.value = ""
    }
    colaHospital.add(new Persona(id))
    label.innerHTML = printBody()
    input.value = ""
}
