import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from "./components/Spinner"
import BackButton from '../components/BackButton'
import axios from 'axios'

function ShowBook() {

  const [books, setBook] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5555/books/${id}`)
      .then(response => {
        setBook(response.data);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })


  }, [])

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className="text-3xl my-4">Show Books</h1>
      {
        loading ?
          (<Spinner />) :
          (<div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
            <div className="my-4"> 
              <span className="text-xl mr-4 text-gray-500">Id</span>
              <span>{books._id}</span>
            </div>
          </div>

          )
      }
    </div>
  )
}

export default ShowBook
