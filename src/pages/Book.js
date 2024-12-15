import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Book() {
  const { id } = useParams(); 
  const [book, setBook] = useState(null);

  const getBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setBook(data); 
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getBook(id); 
    }
  }, [id]);

  return (
    <div className="container pt-5 pb-5">
      <h2>Book Details</h2>
      {book ? (
        <div>
           <img
            src={book.thumbnailUrl}
            alt={book.title}
            style={{ maxWidth: "200px", marginBottom: "20px" }}
          />
          <p><strong>Title:</strong> {book.title}</p>
          <p><strong>ID:</strong>{book._id}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Author:</strong> {book.authors?.join(", ")}</p>
          <p><strong>Price:</strong> {book.price ? `$${book.price}` : "N/A"}</p>
          <p><strong>Short Description:</strong> {book.shortDescription || "No description available."}</p>
          <p><strong>Long Description:</strong> {book.longDescription}</p>
          <p><strong>Page Count:</strong> {book.pageCount}</p>
          <p><strong>Published Date:</strong> {(book.publishedDate && typeof book.publishedDate === 'string')? book.publishedDate.slice(0,10) 
    : "No date available"
}
</p>

          <p><strong>Status:</strong> {book.status}</p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => window.history.back()}
          >
            Back to Books
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
