import express from 'express'
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose'
import bookRoutes from './routes/bookRoutes.js'
import cors from 'cors'


const app = express()
app.use(express.json())

//implementing cors for middlewares
app.use(cors())

//the above is default cors example meaning like app.use(cors(*)) everyone with any origin nethods and allowed-headers can access it

// app.use(cors({
//     origin: 'https://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'Delete'],
//     allowedHeader: ['Content-Type'],
// }))


app.get('/', (req, res) => {
    console.log("Printing Request")
    console.log(req);
    return res.status(234).send("The server is successfully setup and listening");
})

app.use('/books', bookRoutes)

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App connected to the database")
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)
        })

    })
    .catch((error) => {
        console.log(`Error is : ${error}`)
    });