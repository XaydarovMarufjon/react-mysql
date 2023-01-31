import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  console.log(books);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>

      <h1> Book Shop</h1> 
      <button className="btn btn-info w-100" >
        <Link to="/add" className="text-light">
          Add new book
        </Link>
      </button>
      <div className="books ">
        {books.map((book) => (
          <div key={book.id} className="book border rounded">
            <img src={book.cover} alt="" />
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>${book.price}</span>
            <div className="btns">
                 
             <button className="delete btn btn-outline-danger" onClick={() => handleDelete(book.id)}>Delete</button>
             <button className="update btn btn-outline-success">
              <Link
                to={`/update/${book.id}`}
                style={{ color: "inherit", textDecoration: "none" }}>
                Update
              </Link>
            </button>

            </div>
          </div>
        ))}
      </div>

    </>
  );
};

export default Books;