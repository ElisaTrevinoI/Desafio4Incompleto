import express from 'express'
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'
import multer from 'multer'
import { __dirname, __filename } from './path.js'
import * as path from 'path'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'


const app = express()

const PORT = 8080

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})

const server = app.listen(PORT, () => {

    console.log(`Server on port ${PORT}`)

})

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views')) //src/views

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const upload = (multer({ storage: storage }))

//ServerIO

const io = new Server(server, { cors: { origin: "*" } })



io.on('connection', (socket) => {
    console.log("Cliente conectado")

    socket.on('mensaje', info => {
        console.log(info)
    })
})


app.use((req, res, next) => {
    req.io = io
     next()

})

//Routes
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.use('/api', express.static(path.join(__dirname, 'public')))

app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen subida")
})

//Handlebars

app.get('/', (req, res) => {
    res.render('home', {
        titulo: "Plataforma",
    })
})

/*
app.get('/api/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {
        titulo: "Plataforma",
    })
})*/



