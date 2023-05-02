import { Router } from "express";

import { CartManager } from "../CartManager.js";

const CartManager1 = new CartManager('./carritos.txt')

const cartRouter = Router()


export default cartRouter



cartRouter.post("/", async (req, res) => {
    const { } = req.body
    await CartManager1.addCart({})
    res.send("Carrito creado")
})


cartRouter.get("/:cid", async (req, res) => {

    const carritoBuscar = await CartManager1.getCarritoById(req.params.cid)

    res.send(JSON.stringify(carritoBuscar))

})

cartRouter.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid
    const prodId = req.params.pid
    const { quantity } = req.body
    const mensaje = await CartManager1.updateCart(cartId, prodId, { quantity })
    res.send(mensaje)

})