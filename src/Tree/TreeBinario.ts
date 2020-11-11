// Los arbole son una estructura de datos no lineales
// Existen varios tipos : orden 2(binario), orden 3(ternario) orden 4 etc
// Exiten tres maneras de recorrer los nodos de un arbol por profundidad :
// en preorden (raiz,izq y derecho), inorden (izq,raiz,derecha),postorden(dizq,derec,raiz)
// Poniendole el ojo bien lo unico que cambia es la raiz que va vajando de posición 
// inorden index 0,preorden index 1,post orden index 2 | Preorden (antes), inorden (en medio), postorden (después).
//  Los arboles pueden ser recorridos en anchura, en orden de sus niveles, por sierto los arboles 
// tienen niveles lo cual describe la profundidad de un conjunto de nodos para ser mas graficos la raiz de todo el 
// arbol tiene el primer nivel el nivel 0 y bueno sus hijos el nivel 1.


class NodoTree {
    valor: number | null
    izq: NodoTree | null
    der: NodoTree | null

    esVacio() {
        return this.valor == null
    }
    esHoja() {
        return this.valor != null && this.izq == null && this.der == null
    }
    insertar(id: number) {
        if (this.valor == null) {
            this.valor = id
            return
        } else {
            if (id < this.valor) {
                if (this.izq == null) { this.izq = new NodoTree() }
                console.log("izq", this.valor, id)
                this.izq.insertar(id)
            } else if (id > this.valor) {
                if (this.der == null) { this.der = new NodoTree() }
                console.log("der", this.valor, id)
                this.der.insertar(id)
            } else {
                console.log(`Este id existe ${id}`)
            }
        }

    }
}
// Binary Search Tree
const bst = new NodoTree()
console.log(bst.esVacio())
console.log(bst.esHoja())
bst.insertar(50)
bst.insertar(2)
bst.insertar(3)
bst.insertar(4)
bst.insertar(5)
bst.insertar(1)
bst.insertar(-1)
console.log(bst)