import express from "express"
import { Book } from "../models/bookModel.js"

const router = express.Router()

//post method for creating and adding books in the database
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }
        const book = await Book.create(newBook);

        return res.status(201).send(book);

    } catch (error) {
        console.log(`Error is : ${error}`)
        res.status(500).send({ message: error.message })
    }
})


//Get request to get all the Books data from the database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            data: books
        })

    } catch (error) {
        console.log(`Error is ${error.message}`)
        res.status(500).send({ message: error.message })
    }
})


//Now this Get request is for fetching single book associated with some id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const books = await Book.findById(id)
        return res.status(200).json(books)

    } catch (error) {
        console.log(`Error is ${error.message}`)
        res.status(500).send({ message: error.message })
    }
})

//now Put to update the books according to their id in the database
router.put("/:id", async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: "Book not found!" })
        } else {
            return res.status(200).send({ message: "Book updated successfully" })
        }
    } catch (error) {
        console.log(`Error is : ${error.message}`)
        res.status(500).send({ message: error.message })
    }
})


//to delete a book from the database
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            res.status(404).send({ message: "Book not found" })
        }

        return res.status(200).send({ message: "Book delete successfully" })

    } catch (error) {
        console.log(`Error is : ${error.message}`)
        res.status(500).send({ message: error.message });
    }
})


export default router;