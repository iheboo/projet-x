import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthorForm = () => {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // CREATE NEW AUTHOR
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/authors/', { name })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        const errResponse = err.response.data.errors;
        const errObj = {};
        for (const key of Object.keys(errResponse)) {
          errObj[key] = errResponse[key].message;
        }
        setErrors(errObj);
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="">Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <p>{errors.name}</p>
        </div>
        <div>
          <Link to="/">Cancel</Link>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AuthorForm;
