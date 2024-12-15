import React, { useState, useEffect } from "react";
import { CardGroup, Row } from "react-bootstrap";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getUsers = async (page) => {
    try {
      const response = await fetch(`http://localhost:3000/users?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setUsers(data.users);
       if (data.totalPages){
        setTotalPages(data.totalPages)
       }
    } catch (error) {
      console.error('Error:', error);
    }
  };

    const previousPage = () => {
  if(currentPage>1){
    setCurrentPage(currentPage-1);
  }
};

const nextPage = () => {
  if(currentPage < totalPages){
    setCurrentPage(currentPage+1);
  }
};
  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);


  return (
    <div className="container pt-5 pb-5">
      <h2>Users</h2>
      <CardGroup>
      <Row>
          {users.map((user) => (
          <div key={user._id} className="user-card mb-3 p-3 border">
            <h5>{user.first_name} {user.last_name}</h5>
            <p>Year of Birth: {user.year_of_birth}</p>
            <p>Job: {user.job || 'N/A'}</p>
            <a href={`/user/${user._id}`} className="btn btn-primary">View Details</a>
            </div>
          ))}
        </Row>
      </CardGroup>
      <div className="pagination-controls mt-4">
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="mx-3">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

