import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthorList from '../components/AuthorList';

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [authors, setAuthors] = useState([]);

  // GET ALL AUTHORS
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/authors/')
      .then((res) => {
        setAuthors(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // DELETE AUTHOR
  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:5000/api/authors/${id}`)
      .then(() => {
        console.log('Author deleted');
        // DELETE FROM DOM
        setAuthors(authors.filter((author) => author._id !== id));
      })
      .catch((err) => console.log(err));
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h1>Favorate Authors</h1>
      <Link to="/create">Add New Author</Link>
      <p>We Have Quotes by:</p>
      <AuthorList authors={authors} deleteHandler={deleteHandler} />
    </>
  );
};

export default Main;
