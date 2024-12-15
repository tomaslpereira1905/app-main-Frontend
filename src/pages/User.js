import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const getUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data)
      setUser(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Utilizador removido com sucesso!');
        window.history.back()
      } else {
        const errorData = await response.json();
        alert(`Erro ao remover utilizador: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id]);

  return (
    <div className="container pt-5 pb-5">
      <h2>User Details</h2>
      {user ? (
        <div>

          <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
          <p><strong>Id:</strong> {user._id}</p>
          <p><strong>Year of Birth:</strong> {user.year_of_birth}</p>
          <p><strong>Job:</strong> {user.job}</p>
          <p><strong>Top Books:</strong> {user.top_books?.join(", ") || "No books available"}</p>
          <p><strong>Reviews:</strong></p>
{Array.isArray(user.reviews) && user.reviews.length > 0 ? (
  <ul>
    {user.reviews.map((review, index) => (
      <li key={index}>
        <strong>Book ID:</strong> {review.book_id}<br/>
        <strong>Score:</strong> {review.score}<br/>
        <strong>Recommendation:</strong> {review.recommendation.toString()}<br/>

        <strong>Review Date:</strong> {review.review_date}
      </li>
    ))}
  </ul>
) : (
  <p>No reviews available</p>
)}


          <button
          className="btn btn-primary mt-3"
            onClick={() => window.history.back()}
          >
            Back to Users
          </button>

          <button
            className="btn btn-danger mt-3 ms-2"
            onClick={deleteUser}
          >
            Delete User
          </button>

          {/* <button
          className="btn btn-light mt-3 ms-2"
          onClick={}
          >
          Back to Home

          </button> */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
