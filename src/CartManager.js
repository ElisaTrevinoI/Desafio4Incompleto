import { promises as fs } from 'fs'

export class CartManager {

    constructor(path) {
        this.path = path
    }

    static incrementID(incrementar) {
        if (incrementar) {
            incrementar++
        } else {
            incrementar = 1
        }
        return incrementar
    }

    async addCart(carrito) {

        const contenido1 = await fs.readFile(this.path, 'utf-8')
        const auxConsulta3 = JSON.parse(contenido1)
        if (auxConsulta3.length > 0) {
            let lastElement = auxConsulta3[auxConsulta3.length - 1]
            carrito.id = CartManager.incrementID(lastElement.id)
        } else {
            carrito.id = 1
        }
        carrito.products = []

        auxConsulta3.push(carrito)
        await fs.writeFile(this.path, JSON.stringify(auxConsulta3))
        return "Carrito creado"
    }

    async getCarritoById(idBuscar) {

        let contenido3 = await fs.readFile(this.path, 'utf-8')
        const auxConsulta4 = JSON.parse(contenido3)
        const carrito = auxConsulta4.find(carritoCons => carritoCons.id == idBuscar)

        if (carrito.products) {
            return carrito.products
        }
        return "Carrito no encontrado"
    }

    async updateCart(idCarrito, idProducto, obCantidad) {
        let contenido4 = await fs.readFile(this.path, 'utf-8')
        const auxConsulta5 = JSON.parse(contenido4)
        const carBuscar = auxConsulta5.find((idCar => idCar.id == idCarrito))

        if (carBuscar) {
            const prodBuscar = carBuscar.products.find((idProd => idProd.product == idProducto))
            const indProdBuscar = carBuscar.products.findIndex((idProd => idProd.product == idProducto))
            if (prodBuscar) {
                carBuscar.products[indProdBuscar].quantity = carBuscar.products[indProdBuscar].quantity + obCantidad.quantity
                await fs.writeFile(this.path, JSON.stringify(auxConsulta5))
                return "Cantidad carrito actualizada"
            } else {
                const objAlta = { product: parseInt(idProducto), quantity: obCantidad.quantity }
                carBuscar.products.push(objAlta)
                await fs.writeFile(this.path, JSON.stringify(auxConsulta5))
                return "Carrito actualizado"
            }
        }

    }
}
