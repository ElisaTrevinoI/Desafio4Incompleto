import { promises as fs } from 'fs'



export class ProductManager {
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

    async addProduct(producto) {

        const contenido1 = await fs.readFile(this.path, 'utf-8')
        const auxConsulta3 = JSON.parse(contenido1)
        let lastElement = auxConsulta3[auxConsulta3.length - 1];
       // console.log(lastElement)        
        producto.id = ProductManager.incrementID(lastElement.id)
        auxConsulta3.push(producto)
        await fs.writeFile(this.path, JSON.stringify(auxConsulta3))
        return "Producto creado"


    }

    async getProducts() {

        let contenidoLeer = await fs.readFile(this.path, 'utf-8')
        const auxLeer = JSON.parse(contenidoLeer)

        return auxLeer

    }

    async getProductById(idBuscar) {

        let contenido3 = await fs.readFile(this.path, 'utf-8')
        const auxConsulta4 = JSON.parse(contenido3)
        const product = auxConsulta4.find(productoCons => productoCons.id == idBuscar)

        if (product) {
            return product
        }
        return "Producto no encontrado"
    }

    async updateProduct(idActualizar, obActualizar) {

        let contenido4 = await fs.readFile(this.path, 'utf-8')
        const auxConsulta5 = JSON.parse(contenido4)
        const objBuscar = auxConsulta5.findIndex((obj => obj.id == idActualizar))

        let llaves = Object.keys(obActualizar)
        let valores = Object.values(obActualizar)

        let llave = ""


        llaves.forEach((element, index) => {
            llave = element
            let objMod = auxConsulta5[objBuscar]
            if (llave != 'id') {
                objMod[llave] = valores[index]
            }
        })

        await fs.writeFile(this.path, JSON.stringify(auxConsulta5))
        return "Producto actualizado"

    }

    async deleteProduct(idBorrar) {


        let contenido5 = await fs.readFile(this.path, 'utf-8')
        const auxConsulta6 = JSON.parse(contenido5)
        const objBuscar = auxConsulta6.findIndex((obj => obj.id == idBorrar))


        if (objBuscar > -1) {
            auxConsulta6.splice(objBuscar, 1)
            await fs.writeFile(this.path, JSON.stringify(auxConsulta6))
            return "Producto borrado"
        }

    }



}




