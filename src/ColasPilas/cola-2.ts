interface proceso {
    procesar: () => Promise<boolean>
}

class ColaImpresion {
    private activo: boolean
    items: { [name: number]: proceso }
    front: number
    end: number
    constructor() {
        this.items = {}
        this.front = 0
        this.end = 0
        this.activo = false
    }
    enqueue(data: proceso) {
        this.items[this.end] = data
        this.end++
        this.dequeue()
    };
    private async dequeue() {
        if (this.front == this.end || this.activo) { return }
        this.activo = true
        while (this.items[this.front]) {
            const data = this.items[this.front]
            await data.procesar()
            this.front++
            console.log(this.front, this.end)
        }
        this.activo = false
    }
}

class DocImpresion implements proceso {
    private ttl: number
    readonly name: string
    constructor(name: string) {
        this.name = name
        this.ttl = Math.trunc(Math.random() * 10)
    }
    procesar(): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Impreso :  ${this.name}-ttl : ${this.ttl}`)
                resolve(true)
            }, this.ttl);
        })

    }



}


const queue = new ColaImpresion()

queue.enqueue(new DocImpresion("doc1"))
queue.enqueue(new DocImpresion("doc2"))
queue.enqueue(new DocImpresion("doc3"))
queue.enqueue(new DocImpresion("doc4"))
queue.enqueue(new DocImpresion("doc5"))

console.log(queue)