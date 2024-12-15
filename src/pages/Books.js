// import React, {useState, useEffect} from "react";
// import CardGroup from 'react-bootstrap/CardGroup';
// import Row from 'react-bootstrap/Row';

// import BookCard from "../components/BookCard";

// export default function App() {
//   let [books, setBooks] = useState([]);

//   const getBooks = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/books', {
//         method: 'GET',
//         headers: {
//         'Content-Type': 'application/json'
//         },
//       });
      
//       const data = await response.json();
//       console.log(data)
//       setBooks(data);

//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

//   useEffect(() => {
//     getBooks();
//   }, []);

//   return (
//     <div className="container pt-5 pb-5">
//         <h2>Books</h2>
//         <CardGroup>
//             <Row xs={1} md={2} className="d-flex justify-content-around">
//             {books && books.map((book) => {
//                 return (
//                     <BookCard 
//                         key={book._id} 
//                         {...book}
//                     />
//                 );
//             })}
//             </Row>
//         </CardGroup>
//     </div>
//   )
// }

import React, {useState, useEffect} from "react";
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';

import BookCard from "../components/BookCard";

export default function App() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getBooks = async (page = 1) => {
    try {
      const response = await fetch(`http://localhost:3000/books?page=${page}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        },
      });
     
      const data = await response.json();
      console.log(data)
      setBooks(data.books || data);
      if(data.totalPages){
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    getBooks(currentPage);
  }, [currentPage]);

  const previousPage = () => {
if(currentPage>1){
  setCurrentPage(currentPage - 1);
}

  };

  const nextPage = () => {
  setCurrentPage (currentPage + 1);

  };

  return (
    <div className="container pt-5 pb-5">
        <h2>Books</h2>
        <CardGroup>
            <Row xs={1} md={2} className="d-flex justify-content-around">
            {books && books.map((book) => {
                return (
                    <BookCard 
                        key={book._id} 
                        {...book}
                    />
                );
            })}  
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