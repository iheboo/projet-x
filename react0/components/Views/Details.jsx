import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Details = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState({});
  const [bookData, setBookData] = useState({ title: '', numberOfPages: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  //GET ONE AUTHOR
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/authors/${id}`)
      .then((res) => {
        setAuthor(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id, refresh]);

  // GET DATA FROM INPUTS
  const changeHandler = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE NEW BOOK
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/authors/book/${id}`, bookData)
      .then((res) => {
        setRefresh(!refresh);
      })
      .catch((err) => console.log(err));
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <Link to="/">Home</Link>
      <h2>{author.name}</h2>
      <h2>Author Books</h2>
      {author.books.map((book) => {
        return (
          <div key={book?._id}>
            <h4>Book Name: {book?.title}</h4>
            <h4>Number Of Pages: {book?.numberOfPages}</h4>
          </div>
        );
      })}
      <h2>Add New Book</h2>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="">Title</label>
          <input
            type="text"
            name="title"
            onChange={changeHandler}
            value={bookData.title}
          />
        </div>
        <div>
          <label htmlFor="">Number Of Pages</label>
          <input
            type="number"
            name="numberOfPages"
            onChange={changeHandler}
            value={bookData.numberOfPages}
          />
        </div>
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default Details;
