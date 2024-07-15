import express from 'express'
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose'

const app = express()

app.get('/', (req, res) => {
    console.log("Printing Request")
    console.log(req);
    return res.status(234).send("The server is successfully setup and listening");
})



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