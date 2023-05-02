import { Router } from "express";

import { ProductManager } from "../ProductManager.js";


import { Server } from 'socket.io'

const ProductManager1 = new ProductManager('./archivo.txt')

const productRouter = Router()


productRouter.get('/', async (req, res) => {
    try {
        const limite = req.query.limit

        const productos = await ProductManager1.getProducts()

        if (limite > 0) {
            const productsBuscados = productos.splice(0, limite)

            //res.send(JSON.stringify(productsBuscados))
            const productosBuscados1 = JSON.stringify(productsBuscados)

            res.render('home', {

                productosBuscados1
            })

        } else {
            // res.send(JSON.stringify(productos))
            const productosBuscados2 = JSON.stringify(productos)
            // console.log(productos)
            //console.log(productosBuscados2)


            res.render('home', {

                productos
            })

        }
    } catch (error) {
        res.send(error)
    }
})


productRouter.get("/:realtimeproducts", async (req, res) => {
    try {
        const productos = await ProductManager1.getProducts()
        res.render('realtimeproducts', {productos})
    } catch (error) {
        res.send(error)
    }
})


productRouter.get("/:pid", async (req, res) => {

    const productoBuscar = await ProductManager1.getProductById(req.params.pid)

    req.io.emit("Mensaje", "Hola")

    res.send(JSON.stringify(productoBuscar))

    /* res.render('home', {
         title: productoBuscar.title,
         description: productoBuscar.description,
         price: productoBuscar.price,
         code: productoBuscar.code,
         stock: productoBuscar.stock
     })*/

})

productRouter.post("/", async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    const productoAlta = req.body
    if ((productoAlta.title > "") && (productoAlta.description > "") && (productoAlta.code > "") && (productoAlta.price > 0) && (productoAlta.stock > 0) && (productoAlta.category > "")) {
        await ProductManager1.addProduct({ title, description, code, price, status, stock, category, thumbnails })
        res.send("Producto creado")
    }
    res.send("Faltan Datos")
})

productRouter.put("/:id", async (req, res) => {
    const id = req.params.id
    const { title, description, code, price, status, stock, category, thumbnails } = req.body

    const mensaje = await ProductManager1.updateProduct(id, { title, description, code, price, status, stock, category, thumbnails })
    res.send(mensaje)
})

productRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    const mensaje = await ProductManager1.deleteProduct(id)
    res.send(mensaje)
})





export default productRouter