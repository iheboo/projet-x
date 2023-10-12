import React, { useRef, useState } from 'react';
import React, { useRef } from 'react';
 
// export default () => {
//     const input = useRef();
 
//     function focusInput() {
//         input.current.focus();
//     }
 
//     return (
//         <>
//             <input ref={input}/>
//             <button onClick={focusInput}>Focus Me!</button>
//         </>
//     );
// }

 
export default () => {
    const canvas = useRef();
    const [xVal, setXVal] = useState(0);
    const [yVal, setYVal] = useState(0);
    const [color, setColor] = useState('black');
 
    function drawSquare(color, x, y) {
        const ctx = canvas.current.getContext('2d');
 
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 100, 100);
    }
 
    return (
        <>
            <canvas ref={canvas} height="400" width="400"/>
            <div>
                <label>X Coordinate</label>
                <input
                    type="number"
                    min="0"
                    max="200"
                    onChange={e => setXVal(+e.target.value)}
                    value={xVal}
                />
            </div>
            <div>
                <label>Y Coordinate</label>
                <input
                    type="number"
                    min="0"
                    max="200"
                    onChange={e => setYVal(+e.target.value)}
                    value={yVal}
                />
            </div>
            <select
                onChange={e => setColor(e.target.value)}
                value={color}
            >
                <option value="black">black</option>
                <option value="blue">blue</option>
                <option value="red">red</option>
            </select>
            <div>
                <button onClick={() => drawSquare(color, xVal, yVal)}>Draw!</button>
            </div>
        </>
    );
}
// Until now, we've been working with simple state, and we have been able to update it on a granular level with the useState hook. However, if we want to have complex state similar to what we can achieve with class components, React gives us the useReducer hook. With useReducer, we can create complex state 
// and manage it in a similar fashion to how it is done with the popular state-management library Redux. Here's an example of how we can incorporate the useReducer hook:
import React, { useReducer } from 'react';
 
const initialState = {
    name: '',
    email: ''
};
 
function reducer(state, action) {
    return {
        ...state,
        [action.type]: action.payload
    };
}
 
// export default () => {
//     const [state, dispatch] = useReducer(reducer, initialState);
 
//     function handleChange(e) {
//         const { name, value } = e.target;
//         dispatch({
//             type: name,
//             payload: value
//         });
//     }
 
//     return (
//         <div>
//             {JSON.stringify(state)}
//             <div>
//                 <label>
//                     <span>Name:</span>{' '}
//                     <input
//                         name="name"
//                         value={state.name}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     <span>Email:</span>{' '}
//                     <input
//                         name="email"
//                         value={state.email}
//                         onChange={handleChange}
//                     />
//                 </label>
//             </div>
//         </div>
//     );
// // }
// *********************************************************************************************************************
// import React, { useState } from  'react';
    
    
// const UserForm = (props) => {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
    
//     const createUser = (e) => {
//         e.preventDefault();
//         const newUser = { username, email, password };
//         console.log("Welcome", newUser);
//         setHasBeenSubmitted( true );
//     };
    
//     const formMessage = () => {
//         if( hasBeenSubmitted ) {
// 	    return "Thank you for submitting the form!";
// 	} else {
// 	    return "Welcome, please submit the form";
// 	}
//     };
    
//     return (
//         <form onSubmit={ createUser }>
//             <h3>{ formMessage() }</h3>
// 	    <div>
//                 <label>Username: </label> 
//                 <input type="text" onChange={ (e) => setUsername(e.target.value) } />
//             </div>
//             <div>
//                 <label>Email Address: </label> 
//                 <input type="text" onChange={ (e) => setEmail(e.target.value) } />
//             </div>
//             <div>
//                 <label>Password: </label>
//                 <input type="text" onChange={ (e) => setPassword(e.target.value) } />
//             </div>
//             <input type="submit" value="Create User" />
//         </form>
//     );
// };
    
// export default UserForm;

// <form onSubmit={ createUser }>
//     {
//         hasBeenSubmitted ? 
//         <h3>Thank you for submitting the form!</h3> :
//         <h3>Welcome, please submit the form.</h3> 
//     }
//     <div>
//         <label>Username: </label> 
//         <input type="text" onChange={ (e) => setUsername(e.target.value) } />
//     </div>
// </form>
//     const MovieForm = (props) => {
//     const [title, setTitle] = useState("");
//     const [titleError, setTitleError] = useState("");
    
//     const handleTitle = (e) => {
//         setTitle(e.target.value);
//         if(e.target.value.length < 1) {
//             setTitleError("Title is required!");
//         } else if(e.target.value.length < 3) {
//             setTitleError("Title must be 3 characters or longer!");
//         } else {
//             setTitleError("");
//         }
//     }
    
//     {/* rest of component removed for brevity */}
    
//     return (
//         <form onSubmit={ (e) => e.preventDefault() }>
//             <div>
//                 <label>Title: </label>
//                 <input type="text" onChange={ handleTitle } />
//                 {
//                     titleError ?
//                     <p style={{color:'red'}}>{ titleError }</p> :
//                     ''
//                 }
//             </div>
//             <input type="submit" value="Create Movie" />
//         </form>
//     );
// }

// MessageForm.jsx

// import react, { useState } from 'react';
    
    
// const MessageForm = (props) => {
//     const [msg, setMsg] = useState("");
    
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // what should we do with the message?
//     };
    
//     return (
//         <form onSubmit={ handleSubmit }>
//             <h1>Set Message</h1>
//             <textarea 
//                 rows="4"
//                 cols="50"
//                 placeholder="Enter your message here"
//                 onChange={ (e) => setMsg(e.target.value) }
//                 value={ msg }
//             ></textarea>
//             <input type="submit" value="Send Message" />
//         </form>
//     );
// };
    
// export default MessageForm;copy
// MessageDisplay.jsx

// import react, { useState } from 'react';
    
    
// const MessageDisplay = (props) => {
//     return (
//         <>
//             <h1>Current Message</h1>
//             <pre>{ props.message }</pre>
//         </>
//     );
// };
    
// export default MessageDisplay;
// copy
// App.js

// import React, { useState } from 'react';
// import MessageForm from './Components/MessageForm';
// import MessageDisplay from './Components/MessageDisplay';
    
    
// function App() {
//     const [currentMsg, setCurrentMsg] = useState("There are no messages");
    
//     return (
//         <>
//             <MessageForm />
//             <MessageDisplay message={ currentMsg } />
//         </>
//     );
// }
    
// export default App;
function App() {
    const [currentMsg, setCurrentMsg] = useState("There are no messages");
    
    const youveGotMail = ( newMessage ) => {
        setCurrentMsg( newMessage );
    }
    
    return (
        <>
            <MessageForm onNewMessage={ youveGotMail } />
            <MessageDisplay message={ currentMsg } />
        </>
    );
}
const handleSubmit = (e) => {
    e.preventDefault();
    props.onNewMessage( msg );
};
 const MyComponent = props => {
    const onClickHandler = (e) => {
        alert("You have clicked the button");
    }
 
    return props.movies.map( (item, index) => {
        return <button onClick={ onClickHandler }>{ item }</button>
    });
}   
// const MyComponent = props => {
//     const onClickHandler = (e, value) => {
//         alert(value);
//     }
 
//     return props.movies.map( (item, index) => {
//         return <button onClick={ (e) => onClickHandler(e, item) }>{ item }</button>
//     });
// }

import { createContext } from 'react';

const MyContext = createContext();
import AppWrapperComponent from './AppWrapperComponent';
import MyContext from './context/MyContext';
// function App() {
//   return (
//     <div className="App">
//       <MyContext.Provider value={"context value"}>
//         <AppWrapperComponent>
//         </AppWrapperComponent>
//       </MyContext.Provider>
//     </div>
//   );
// }
// export default App;
// import React, { useContext } from 'react';
// import MyContext from './context/MyContext';
// const GreatGreatGreatGrandchildComponent = (props) =>{
//     const context = useContext(MyContext);
//     return(
//       <div>
//         hello {context}
//       </div>
//     )
// }
// export default GreatGreatGreatGrandchildComponent;
import AppWrapperComponent from './AppWrapperComponent';
import NumContext from './context/NumContext';
 
// function App() {
//   const [val, setVal] = useState(1);
 
//   return (
//     <div className="App">
//       <NumContext.Provider value={{val, setVal}}>
//         <AppWrapperComponent>
//         </AppWrapperComponent>
//       </NumContext.Provider>
//     </div>
//   );
// }
 
// export default App;
import { useState } from 'react';
 
// export default (initialList = []) => {
//     const [list, setList] = useState(initialList);
 
//     function add(str) {
//         setList([...list, str]);
//     }
 
//     function remove(index) {
//         setList([
//             ...list.slice(0, index),
//             ...list.slice(index + 1)
//         ]);
//     }
 
//     return {
//         list,
//         add,
//         remove
//     };
// }
import useList from './useList';
 
// export default () => {
//     const [val, setVal] = useState('');
//     const { list, add } = useList(['first', 'second']);
 
//     function handleSubmit() {
//         add(val);
//         setVal('');
//     }
//     return (
//         <>
//             {list.map((item, i) => <p key={i}>{item}</p>}
//             <input
//                 onChange={e => setVal(e.target.value)}
//                 value={val}
//             />
//             <button onClick={handleSubmit}>Add</button>
//         </>
//     );
// }   
// const noMondays = new Promise( (resolve, reject) => {
//         if(new Date().getDay() !== 1) {
//             resolve("Good, it's not Monday!");
//         } else {
//             reject("Someone has a case of the Mondays!");
//         }
//     });
//     noMondays
//         .then( res => console.log(res) )
//         .catch( err => console.log(err) );
function tossCoin() {
        return Math.random() > 0.5 ? "heads" : "tails";
    }
    function fiveHeadsSync() {
            let headsCount = 0;
            let attempts = 0;
            while(headsCount < 5) {
                attempts++;
                let result = tossCoin();
                console.log(`${result} was flipped`);
                if(result === "heads") {
                    headsCount++;
                } else {
                    headsCount = 0;
                }
            }
            return `It took ${attempts} tries to flip five "heads"`;
        }
        console.log( fiveHeadsSync() );
        console.log( "This is run after the fiveHeadsSync function completes" );

        function fiveHeads() {
                return new Promise( (resolve, reject) => {
                    // your code here!
                });
            }
            fiveHeads()
                .then( res => console.log(res) )
                .catch( err => console.log(err) );
            console.log( "When does this run now?" );

            fetch("http://www.example.com")
    .then(response =>{
        //do something
    }).catch(err => {
        console.log(err);
    })
    let response = await fetch("http://www.example.com");

//     What did we just do? First, we created a request to the endpoint "https://pokeapi.co/api/v2/pokemon" via fetch. If you were to copy this into an html 
// file yourself and then open it, you would see the Pokemon response in the Javascript console. Using fetch is a very easy way to get a simple request going in your html file.

// By default, fetch gives us the entire raw HTTP response we get from our API call, and it's not yet ready for JavaScript to read! 
// Our first promise, the .then statement resolves our API, and our second .then is a promise for parsing it into usable JSON. That's why we run .then twice when using fetch!

// If you want to know more about how fetch works, you can check out the documentation
    
// const someComponent = props => {
//     //Note the second argument is an empty array.
//     const [responseData, setResponseData] = useState(null);
//     useEffect(()=>{
//         axios.get('http://www.example.com')
//             .then(response=>{setResponseData(response.data)})
//     }, []); 
//     return(
//         <div>
//             {responseData}
//         </div>
//     )
// }

// const Example = (props) => {
//     const [people, setPeople] = useState([]);
 
//     useEffect(() => {
//         fetch('https://swapi.dev/api/people/')
//             .then(response => response.json())
//             .then(response => setPeople(response.results))
//     }, []);
 
//     return (
//         <div>
//             {people.length > 0 && people.map((person, index)=>{
//                 return (<div key={index}>{person.name}</div>)
//             })}
//         </div>
//     );
// }
// export default Example;
useEffect(()=>{
    alert("When will this run?");
}, []);
useEffect(()=>{
    alert("When will this run?");
}, [state.isSubmitted]);
import React, { useEffect, useState } from 'react';
 
// export default () => {
//     const [time, setTime] = useState(new Date().toLocaleString());
 
//     useEffect(() => {
//         const int = setInterval(
//             () => setTime(new Date().toLocaleString()),
//             1000
//         );
 
//         return function clearInt() {
//             clearInterval(int);
//         }
//     }, []);
 
//     return (
//         <div>Current Time: {time}</div>
//     );
// }

import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

App.js
import React from "react";
import {
  Link,
  Routes,
  Route
} from "react-router-dom";
    
// const Location = (props) => {
//   return (
//     <h1>Location Component Loaded!</h1>
//   );
// }
    
// function App() {
//   return (
//     <div>
//       <p>
//         <Link to="/location/seattle">Seattle</Link>
//          | 
//         <Link to="/location/chicago">Chicago</Link>
//          | 
//         <Link to="/location/burbank">Burbank</Link>
//       </p>
//       <Routes>
//         <Route path="/location/:city" element={<Location />}/>
//       </Routes>
//     </div>
//   );
// }
    
// export default App;
import { useParams } from "react-router"; //Top of App.js
//Rest of imports here...
    
const Location = (props) => { 
  const { city } = useParams(); // matches our :city in our Routes
    
  return (
    <h1>Welcome to { city }!</h1>
  );
}
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
    
import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
    
const Survey = (props) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
    
  const sendSurvey = (e) => {
    e.preventDefault();
    // When the user clicks the submit input in the form, 
	//we will navigate to the "/results" path
    navigate("/results");
  }
    
  return (
    <form onSubmit={ sendSurvey }>
      <label>Your Name:</label>
      <input type="text" onChange={ (e) => setName(e.target.value) } value={ name } />
      <label>Your Comment:</label>
      <textarea onChange={ (e) => setComment(e.target.value) } value={ comment }></textarea>
      <input type="submit" value="Submit Survey" />
    </form>
  );
}
// const sendSurvey = (e) => {
//     e.preventDefault();
//     // When the user clicks submit, they will return to the previous page they were on.
//     navigate(-1);
//   }  
// }

// Learning the syntax to leverage basic CRUD operations with Mongoose
// Here is a list and examples of some common Mongoose Commands you may need to use. These will be used in most Mongoose projects so make sure to practice them as much as you can.

// Defining a User Schema
// Create a Schema for Users
const UserSchema = new mongoose.Schema({
 name: { type: String },
 age: { type: Number }
}, { timestamps: true })
// create a constructor function for our model and store in variable 'User'
const User = mongoose.model('User', UserSchema);
// copy
// Finding all Users
// ...retrieve an array of all documents in the User collection
User.find()
    .then(users => {
        // logic with users results
    })
    .catch(err => res.json(err));
// copy
// Finding all Users where their name is Jessica
// ...retrieve an array of documents matching the query object criteria
User.find({name:'Jessica'}) 
    .then(usersNamedJessica => {
        // logic with usersNamedJessica results
    })
    .catch(err => res.json(err));
// copy
// Finding one User by _id
// ...retrieve 1 document (the first record found) matching the query object criteria
User.findOne({_id: '5d34d361db64c9267ed91f73'})
    .then(user => {
        // logic with single user object result
    })
    .catch(err => res.json(err));
// copy
// Create a user
 // ...create a new document to store in the User collection and save it to the DB.
const bob = new User(req.body);
// req.body is an object containing all the users data.
// if we look at req.body as an object literal it would look like this
	/*
     * req.body = {
     *		"name": "Bob Ross",
     *		"age": 42
     *	}
    **/
bob.save()
    .then(newUser => {
        // logic with succesfully saved newUser object
    })
    .catch(err => res.json(err));
 // If there's an error and the record was not saved, this (err) will contain validation errors.
// copy
// Create a user (simplified)
 // ...create a new document to store in the User collection and save it to the DB.
const { userData } = req.body;
User.create(userData)
    .then(newUser => {
        // logic with succesfully saved newUser object
    })
    .catch(err => res.json(err));
 // If there's an error and the record was not saved, this (err) will contain validation errors.
// copy
// Delete all users
// ...delete all documents of the User collection
User.remove()
    .then(deletedUsers => {
        // logic (if any) with successfully removed deletedUsers object
    })
    .catch(err => res.json(err));
// copy
// Delete one user
// ...delete 1 document that matches the query object criteria
User.remove({_id: '5d34d361db64c9267ed91f73'})
    .then(deletedUser => {
        // logic (if any) with successfully removed deletedUser object
    })
    .catch(err => res.json(err));
// copy
// Update one record
// ...update 1 document that matches the query object criteria
User.updateOne({name:'Bob Ross'}, {
    name: 'Ross Bob',
    $push: {pets: {name: 'Sprinkles', type: 'Chubby Unicorn' }}
})
    .then(result => {
        // logic with result -- note this will be the original object by default!
    })
    .catch(err => res.json(err));
// copy
// Advanced Queries
// An alternative way to update a record
User.findOne({name: 'Bob Ross'})
    .then(user => {
        user.name = 'Rob Boss';
        user.pets.push({name: 'Sprinkles', type: 'Chubby Unicorn'});
        return user.save();
    })
    .then(saveResult => res.json(saveResult))
    .catch(err => res.json(err));
copy
// Validate for uniqueness before creating new DB entry
User.exists({name: req.body.name})
    .then(userExists => {
        if (userExists) {
            // Promise.reject() will activate the .catch() below.
            return Promise.reject('Error Message Goes Here');
        }
        return User.create(req.body);
    })
    .then(saveResult => res.json(saveResult))
    .catch(err => res.json(err));

//     *************************************npm init -y
// **********************************************npm install mongoose express

const mongoose = require('mongoose');
 
mongoose.connect('mongodb://127.0.0.1:27017/name_of_your_DB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));

    const User = require('../models/user.model');
 
module.exports.findAllUsers = (req, res) => {
    User.find()
        .then((allDaUsers) => {
            res.json({ users: allDaUsers })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}
 
module.exports.findOneSingleUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(oneSingleUser => {
            res.json({ user: oneSingleUser })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}
 
module.exports.createNewUser = (req, res) => {
    User.create(req.body)
        .then(newlyCreatedUser => {
            res.json({ user: newlyCreatedUser })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}
 
module.exports.updateExistingUser = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedUser => {
            res.json({ user: updatedUser })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}
 
module.exports.deleteAnExistingUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

        const UserController = require('../controllers/user.controller');
 
module.exports = app => {
    app.get('/api/users', UserController.findAllUsers);
    app.get('/api/users/:id', UserController.findOneSingleUser);
    app.put('/api/users/:id', UserController.updateExistingUser);
    app.post('/api/users', UserController.createNewUser);
    app.delete('/api/users/:id', UserController.deleteAnExistingUser);
}
const express = require("express");
const app = express();
    
require("./config/mongoose.config");
    
app.use(express.json(), express.urlencoded({ extended: true }));
    
const AllMyUserRoutes = require("./routes/user.routes");
AllMyUserRoutes(app);
    
app.listen(8000, () => console.log("The server is all fired up on port 8000"));

// Debug
// If it didn't work make sure the following things are done:

// Make sure your MongoDB server is running (the 'mongod' command)
// Make sure your post data matches the data that you are inserting into the database (name and age)
// Make sure that your form submits a post request to '/users'
// Make sure mongoose is actually installed
// Check the order of everything related to mongoose (require --> connect --> Schema --> Model --> route)
// Use lots of console.log statements and follow the flow of data.

// Let's jump right into creating our full stack MERN project. First, create a new folder called "myNewProject" and cd into it.

// mkdir myNewProject
// cd myNewProject
// copy
// Next, create a new project via:

// npm init -y
// copy
// This will create the package.json for our server. We will then need to install our dependencies:

// npm install express
// npm install mongoose
// copy
// Next, via the terminal or the UI, create a new file called server.js.

// Mac: touch server.js
// Windows: copy nul server.js
// copy
// Then, within the server.js add the following code:

// const express = require('express');
// const app = express();
// const port = 8000;
    
// app.listen(port, () => console.log(`Listening on port: ${port}`) );copy
// Let's create our modularized project structure by making a folder called "server" and then create four more folders within that called "config", "controllers", "models" and "routes".

// This is how we create the project structure for our backend. Now, let's create our React project via create-react-app. Since React is used for the client side code, we can call our project "client". Make sure you are in the same folder level as your "server.js".

// npx create-react-app client
// copy
// Now that you have your React project built, you will be running two different servers: your front end React server with live reloading and your Express server.

controllers/person.controller.js

module.exports.index = (request, response) => {
    response.json({
       message: "Hello World"
    });
}
routes/person.routes.js

const PersonController = require('../controllers/person.controller');
module.exports = function(app){
    app.get('/api', PersonController.index);
}
server.js
const express = require('express');
// const app = express();
require('./server/routes/person.routes')(app); // This is new
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
// npm install axios
client/src/Main.js
import React, { useEffect, useState } from 'react'
import axios from 'axios';
// export default () => {
//     const [ message, setMessage ] = useState("Loading...")
//     useEffect(()=>{
//         axios.get("http://localhost:8000/api")
//             .then(res=>setMessage(res.data.message))       
//     }, []);
//     return (
//         <div>
//             <h2>Message from the backend: {message}</h2>
//         </div>
//     )
// }
// import React from 'react';
// import Main from './Main';
// function App() {
//   return (
//     <div className="App">
//       <Main />
//     </div>
//   );
// }
// export default App;
// npm install cors
const express = require('express');
const cors = require('cors') // This is new
// const app = express();
app.use(cors()) // This is new
require('./server/routes/person.routes')(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
config/mongoose.config.js

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/crmdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));
    models/person.model.js

const mongoose = require('mongoose');
const PersonSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String }
}, { timestamps: true });
module.exports.Person = mongoose.model('Person', PersonSchema);
server.js

const express = require('express');
const cors = require('cors');

require('./server/config/mongoose.config'); // This is new
app.use(cors());
app.use(express.json()); // This is new
app.use(express.urlencoded({ extended: true })); // This is new
require('./server/routes/person.routes')(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
controllers/person.controller.js

const { Person } = require('../models/person.model');
module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}
    // The method below is new
module.exports.createPerson = (request, response) => {
    const { firstName, lastName } = request.body;
    Person.create({
        firstName,
        lastName
    })
        .then(person => response.json(person))
        .catch(err => response.json(err));
}
const PersonController = require('../controllers/person.controller');
module.exports = function(app){
    app.get('/api', PersonController.index);
    app.post('/api/people', PersonController.createPerson);
}
components/PersonForm.js

import React, { useState } from 'react'
import axios from 'axios';
// export default () => {
//     //keep track of what is being typed via useState hook
//     const [firstName, setFirstName] = useState(""); 
//     const [lastName, setLastName] = useState("");
//     //handler when the form is submitted
//     const onSubmitHandler = e => {
//         //prevent default behavior of the submit
//         e.preventDefault();
//         //make a post request to create a new person
//         axios.post('http://localhost:8000/api/people', {
//             firstName,
//             lastName
//         })
//             .then(res=>console.log(res))
//             .catch(err=>console.log(err))
//     }
//     //onChange to update firstName and lastName
//     return (
//         <form onSubmit={onSubmitHandler}>
//             <p>
//                 <label>First Name</label><br/>
//                 <input type="text" onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
//             </p>
//             <p>
//                 <label>Last Name</label><br/>
//                 <input type="text" onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
//             </p>
//             <input type="submit"/>
//         </form>
//     )
// }
import React, { useEffect, useState } from 'react';
import PersonForm from '../components/PersonForm';
// export default () => {
//     return (
//         <div>
//            <PersonForm/>
//         </div>
//     )
// }

// Update
// Let's look at how we can update items in our database. First, let's set up our API endpoint. Let's add a route:

// app.put('/api/people/:id', PersonController.updatePerson);
// copy
// And then add a new method to the controller:

module.exports.updatePerson = (request, response) => {
    Person.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedPerson => response.json(updatedPerson))
        .catch(err => response.json(err))
}
// copy
// Next, let's look at how we can implement this in React: We will need to add a new view:

views/Update.js

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
    
// const Update = (props) => {
//     const { id } = useParams();
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
    
//     useEffect(() => {
//         axios.get('http://localhost:8000/api/people/' + id)
//             .then(res => {
//                 setFirstName(res.data.firstName);
//                 setLastName(res.data.lastName);
//             })
//     }, []);
    
//     const updatePerson = e => {
//         e.preventDefault();
//         axios.put('http://localhost:8000/api/people/' + id, {
//             firstName,
//             lastName
//         })
//             .then(res => console.log(res))
//             .catch(err => console.error(err));
//     }
    
//     return (
//         <div>
//             <h1>Update a Person</h1>
//             <form onSubmit={updatePerson}>
//                 <p>
//                     <label>First Name</label><br />
//                     <input type="text" 
//                     name="firstName" 
//                     value={firstName} 
//                     onChange={(e) => { setFirstName(e.target.value) }} />
//                 </p>
//                 <p>
//                     <label>Last Name</label><br />
//                     <input type="text" 
//                     name="lastName"
//                     value={lastName} 
//                     onChange={(e) => { setLastName(e.target.value) }} />
//                 </p>
//                 <input type="submit" />
//             </form>
//         </div>
//     )
// }
    
// export default Update;
<Route element={<Update/>} path="/people/:id/edit"/>
{/* <Link to={"/people/" + person._id + "/edit"}>
    Edit
</Link> */}
app.delete('/api/people/:id', PersonController.deletePerson);
copy
// And then a method to our controller:

module.exports.deletePerson = (request, response) => {
    Person.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}
// copy
// Let's now add the functionality to our front end. With axios, we can simply make an onClick event for a delete button. Let's add this method to our PersonList.js:

components/PersonList.js

// import React from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
    
// const PersonList = (props) => {
//     const { removeFromDom } = props;
    
//     const deletePerson = (personId) => {
//         axios.delete('http://localhost:8000/api/people/' + personId)
//             .then(res => {
//                 removeFromDom(personId)
//             })
//             .catch(err => console.error(err));
//     }
    
//     return (
//         <div>
//             {props.people.map((person, idx) => {
//                 return <p key={idx}>
//                     <Link to={"/" + person._id}>
//                         {person.lastName}, {person.firstName}
//                     </Link>
//                     |
//                     <button onClick={(e)=>{deletePerson(person._id)}}>
//                         Delete
//                     </button>
//                 </p>
//             })}
//         </div>
//     )
// }
    
// export default PersonList;
views/Main.js

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PersonForm from '../components/PersonForm';
import PersonList from '../components/PersonList';
    
// const Main = (props) => {
//     const [people, setPeople] = useState([]);
//     const [loaded, setLoaded] = useState(false);
    
//     useEffect(()=>{
//         axios.get('http://localhost:8000/api/people')
//             .then(res=>{
//                 setPeople(res.data);
//                 setLoaded(true);
//             })
//             .catch(err => console.error(err));
//     },[]);
    
//     const removeFromDom = personId => {
//         setPeople(people.filter(person => person._id != personId));
//     }
    
//     return (
//         <div>
//            <PersonForm/>
//            <hr/>
//            {loaded && <PersonList people={people} removeFromDom={removeFromDom}/>}
//         </div>
//     );
// }
    
// export default Main;
import React, { useEffect, useState } from 'react'
import axios from 'axios';
// export default props => {
//     const { initialFirstName, initialLastName, onSubmitProp } = props;
//     const [firstName, setFirstName] = useState(initialFirstName);
//     const [lastName, setLastName] = useState(initialLastName);
//     const onSubmitHandler = e => {
//         e.preventDefault();
//         onSubmitProp({firstName, lastName});
//     }
        
//     return (
//         <form onSubmit={onSubmitHandler}>
//             <p>
//                 <label>First Name</label><br />
//                 <input 
//                     type="text" 
//                     name="firstName" value={firstName} 
//                     onChange={(e) => { setFirstName(e.target.value) }} />
//             </p>
//             <p>
//                 <label>Last Name</label><br />
//                 <input 
//                     type="text" 
//                     name="lastName" 
//                     value={lastName} 
//                     onChange={(e) => { setLastName(e.target.value) }} />
//             </p>
//             <input type="submit" />
//         </form>
//     )
// }
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PersonForm from '../components/PersonForm';
import PersonList from '../components/PersonList';
// export default () => {
//     const [people, setPeople] = useState([]);
//     const [loaded, setLoaded] = useState(false);
//     useEffect(() => {
//         axios.get('http://localhost:8000/api/person')
//             .then(res =>{ 
//                 setPeople(res.data)
//                 setLoaded(true);
//             });
//     }, [])
//     const removeFromDom = personId => {
//         setPeople(people.filter(person => person._id != personId));
//     }
//     const createPerson = person => {
//         axios.post('http://localhost:8000/api/person', person)
//             .then(res=>{
//                 setPeople([...people, res.data]);
//             })
//     }
//     return (
//         <div>
//            <PersonForm onSubmitProp={createPerson} initialFirstName="" initialLastName=""/>
//            <hr/>
//            {loaded && <PersonList people={people} removeFromDom={removeFromDom}/>}
//         </div>
//     )
// }
views/Update.js

// ...
const { id } = props;
const [person, setPerson] = useState();
const [loaded, setLoaded] = useState(false);
useEffect(() => {
    axios.get('http://localhost:8000/api/person/' + id)
        .then(res => {
            setPerson(res.data);
            setLoaded(true);
        })
}, [])
const updatePerson = person => {
    axios.put('http://localhost:8000/api/person/' + id, person)
        .then(res => console.log(res));
}
// ...
//In our return
{loaded && (
    <PersonForm
        onSubmitProp={updatePerson}
        initialFirstName={person.firstName}
        initialLastName={person.lastName}
    />
)}
components/DeleteButton.js

import React from 'react'
import axios from 'axios';
    
// export default props => {
    
//     const { personId, successCallback } = props;
    
//     const deletePerson = e => {
//         axios.delete('http://localhost:8000/api/person/' + personId)
//             .then(res=>{
//                 successCallback();
//             })
//     }
    
//     return (
//         <button onClick={deletePerson}>
//             Delete
//         </button>
//     )
// }
components/PersonList.js

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import DeleteButton from './DeleteButton';
    
// const PersonList = (props) => {
//     const [people, setPeople] = useState([]);
   
//     useEffect(() => {
//         axios.get('http://localhost:8000/api/person')
//             .then(res => setPeople(res.data));
//     }, [])
    
//     const removeFromDom = personId => {
//         setPeople(people.filter(person => person._id != personId))
//     }
    
//     return (
//         <div>
//             {people.map((person, idx) => {
//                 return (
//                     <p key={idx}>
//                         <Link to={"/" + person._id}>
//                             {person.lastName}, {person.firstName}
//                         </Link>
//                         |
//                         <Link to={"/" + person._id + "/edit"}>
//                             Edit
//                         </Link> 
//                         |
//                        <DeleteButton personId={person._id} successCallback={()=>removeFromDom(person._id)}/>
//                     </p>
//                 )
//             })}
//         </div>
//     );
// }
    
// export default PersonList;
views/Update.js

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import PersonForm from '../components/PersonForm';
import DeleteButton from '../components/DeleteButton';
// const Update = (props) => {
    
//     const history = useHistory()
//     const { id } = useParams();
//     const [person, setPerson] = useState();
//     const [loaded, setLoaded] = useState(false);
    
//     useEffect(() => {
//         axios.get('http://localhost:8000/api/person/' + id)
//             .then(res => {
//                 setPerson(res.data);
//                 setLoaded(true);
//             })
//     }, []);
    
//     const updatePerson = person => {
//         axios.put('http://localhost:8000/api/person/' + id, person)
//             .then(res => console.log(res));
//     }
    
//     return (
//         <div>
//             <h1>Update a Person</h1>
//             {loaded && (
//                 <>
//                     <PersonForm
//                         onSubmitProp={updatePerson}
//                         initialFirstName={person.firstName}
//                         initialLastName={person.lastName}
//                     />
//                     <DeleteButton personId={person._id} successCallback={() => history.push("/")} />
//                 </>
//             )}
//         </div>
//     )
// }
    
// export default Update;
// npx create-react-app client*********************************************
// copy
// Once that is created, change directories into that folder and install Material-UI:************************************

// npm install @material-ui/core****************************
import { Paper } from '@material-ui/core';
// ...
<Paper elevation={3}>
    <p>Some text here</p>
</Paper>
import { Card } from '@material-ui/core';
// ...
<Card>
    <CardContent>
        <h1>This is content within my card</h1>
    </CardContent>
</Card>
import { Button } from '@material-ui/core';
// ...
{/* <Button>
    Click Me
</Button> */}
<TextField variant="filled"/>

import React from 'react';
import {
    Paper,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button
} from '@material-ui/core';
const styles = {
    paper: {
        width: "20rem", padding: "1rem"
    },
    input: {
        marginBottom: "1rem"
    },
    button: {
        width: "100%"
    }
}
// export default function LoginForm() {
    return (
        <Paper elevation={3} style={styles.paper}>
            <h2>Login Form</h2>
            <form>
                <FormControl variant="outlined" style={styles.input}>
                    <InputLabel>Username</InputLabel>
                    <OutlinedInput type="text"/>
                </FormControl>
                <FormControl variant="outlined" style={styles.input}>
                    <InputLabel>E-mail</InputLabel>
                    <OutlinedInput type="email"/>
                </FormControl>
                <FormControl variant="outlined" style={styles.input}>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput type="password"/>
                </FormControl>
                <FormControl variant="outlined" style={styles.input}>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput type="password"/>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Register
                </Button>
            </form>
        </Paper>
    )
// }
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [
            true,
            "Title is required"
        ]
    },
    numberOfPages: {
        type: Number,
        required: [
            true,
            "Pages is required"
        ]
    }    
}, { timestamps: true });
const Book = require('../models/book.model');
module.exports = {
    create: (request, response) => {
        const { title, pages } = request.body;
        Book.create({
            title,
            pages
        })
            .then(book => response.json(book))
            .catch(err => response.status(400).json(err))
    }
}
{
    // "errors": {
    //     "title": {
    //         "message": "Title is required",
    //         "name": "ValidatorError",
    //         "properties": {
    //             "message": "Title is required",
    //             "type": "required",
    //             "path": "title"
    //         },
    //         "kind": "required",
    //         "path": "title"
    //     },
    //     "numberOfPages": {
    //         "message": "Pages is required",
    //         "name": "ValidatorError",
    //         "properties": {
    //             "message": "Pages is required",
    //             "type": "required",
    //             "path": "numberOfPages"
    //         },
    //         "kind": "required",
    //         "path": "numberOfPages"
    //     }
    // },
    // "_message": "Book validation failed",
    // "message": "Book validation failed: numberOfPages: Pages is required, title: Title is required",
    // "name": "ValidationError"
}
import React, { useState } from 'react';
import axios from 'axios';
// export default function Main() {
    const [title, setTitle] = useState("");
    const [pages, setPages] = useState(0);
    //Create an array to store errors from the API
    const [errors, setErrors] = useState([]); 
    const onSubmitHandler = e => {
        e.preventDefault();
        //Send a post request to our API to create a Book
        axios.post('http://localhost:8000/books', {
            title,
            pages
        })
            .then(res=>console.log(res)) // If successful, do something with the response. 
            .catch(err=>{
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })            
    }
    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                {errors.map((err, index) => <p key={index}>{err}</p>)}
                <p>
                    <label>Title</label>
                    <input type="text" onChange={e => setTitle(e.target.value)} />
                </p>
                <p>
                    <label>Pages</label>
                    <input type="text" onChange={e => setPages(e.target.value)} />
                </p>
                <input type="submit" />
            </form>
        </div>
    )
// }

// ipconfig  *****************  npm install socket.io ************npm install socket.io-client

const express = require('express');
// const app = express();
 
const server = app.listen(8000, () =>
  console.log('The server is all fired up on port 8000')
);
 
// To initialize the socket, we need to
// invoke the socket.io library
// and pass it our Express server
const io = require('socket.io')(server, { cors: true });

// const UserSchema = new mongoose.Schema({
//     firstName: {
//       type: String,
//       required: [true, "First name is required"]
//     },
//     lastName: {
//       type: String,
//       required: [true, "Last name is required"]
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"]
//     },
//     password: {
//       type: String,
//       required: [true, "Password is required"],
//       minlength: [8, "Password must be 8 characters or longer"]
//     }
//   }, {timestamps: true});
// validate: {
//     validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
//     // message: "Please enter a valid email"
//   }
  UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );
  UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
      this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
  });
  const bcrypt = require('bcrypt');
// this should go after 
UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
})
register: (req, res) => {
    User.create(req.body)
      .then(user => {
          res.json({ msg: "success!", user: user });
      })
      .catch(err => res.json(err));
  }
//  ******************************************* npm install dotenv 
//    *********************************************************.gitignore
//   ***********************************************************.env       =>    FIRST_SECRET_KEY="first key value"
// ************************************************************************SECOND_SECRET_KEY="second key value"
server.js

require('dotenv').config();
// Once you have invoked this function, later in your code, you can retrieve the values from the process.env object, as in the following.

// const myFirstSecret = process.env.FIRST_SECRET_KEY;
// Once you have invoked this function, later in your code, you can retrieve the values from the process.env object, as in the following.

// const myFirstSecret = process.env.FIRST_SECRET_KEY;
// *********************************************************************************************************************************************************************
// JSON Web Tokens
// In order to keep track of who is logged in, we will be using JSON web tokens (JWTs). JWTs are a structured way to
//  keep data secure and to make sure that data has not been tampered with along the request/response cycle.

// JWT Structure
// There are three parts to a JWT: the header, the body, and the signature. The header holds data about the JWT itself and the signature signs the JWT. 
// The body is where we will actually store the information we want.

// Creating a JWT
// We will be using a third-party package called jsonwebtoken that we can use to create and sign these tokens.

// First, within your project, run npm install jsonwebtoken.

// Next, we can require it in our project via

const jwt = require("jsonwebtoken");
copy
// 


const payload = {
  id: user._id
};
 
// notice that we're using the SECRET_KEY from our .env file
const userToken = jwt.sign(payload, process.env.SECRET_KEY);
copy
// Now, we have created a jwt that we can send with our responses. The way we will do this is with a cookie, and we will cover it in the next lesson.

// Additional Resources
// */*/*/*/*/*/*/**/*/*/*/*/*/*/*/*/*/ */
Cookies in Express
// In order to use cookies in express, we will need to install an extra dependency: cookie-parser. Run npm install cookie-parser. 
// Next, go to your server.js and include the following new lines of code:

// const cookieParser = require('cookie-parser');
// ...
// app.use(cookieParser());
// // Change the app.use(cors()) to the one below
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
// copy
// Now our app has the abilities to send and read cookies with each request/response.

// In a given response, we can set a cookie via the following:

// res.cookie("mycookie", "mydata", { httpOnly: true }).json({
//   message: "This response has a cookie"
// });
// copy
// This is how we can use cookies in our project.

// On the front end, once the cookie is client side, we can send the cookie with every request. In the next lesson, let's look at how to login.
// function oneAfterAnother(startingVal) {
//     firstFunc(startingVal)
//         .then(firstResult => {
//             secondFunc(firstResult)
//                 .then(secondResult => /* do something with the second result */)
//                 .catch(console.log)
//         })
//         .catch(console.log);
// }
// function oneAfterAnother(startingVal) {
//     firstFunc(startingVal)
//         .then(secondFunc) // equivalent to .then(firstResult => secondFunc(firstResult))
//         .then(secondResult => /* do something with the second result */)
//         .catch(console.log); // logs out error if thrown
// }
async function oneAfterAnother(startingVal) {
    const firstResult = await firstFunc(startingVal);
    const secondResult = await secondFunc(firstResult);
 
    return secondResult;
}
async function oneAfterAnother() {
    try {
        const firstResult = await firstFunc();
        const secondResult = await secondFunc(firstResult);
 
        return secondResult;
    } catch(err) {
        // do something with the error here
    }
}
// *--*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
login: async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
 
    if(user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }
 
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
 
    if(!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }
 
    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);
 
    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, secret, {
            httpOnly: true
        })
        .json({ msg: "success!" });
}
// Updating Register Method
// We can now update the register method with some additional logic.
//  Once the user is successfully registered, we can log them in immediately as an added convenience.

// ...
register: (req, res) => {
  User.create(req.body)
    .then(user => {
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
 
        res
            .cookie("usertoken", userToken, secret, {
                httpOnly: true
            })
            .json({ msg: "success!", user: user });
    })
    .catch(err => res.json(err));
}
logout: (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}
// Let's add in a new file in our config folder and call it jwt.config.js.

const jwt = require("jsonwebtoken");
 
module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
    if (err) { 
      res.status(401).json({verified: false});
    } else {
      next();
    }
  });
}
const Users = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = app => {
  app.post("/api/register", Users.register);
  app.post("/api/login", Users.login);
  // this route now has to be authenticated
  app.get("/api/users", authenticate, Users.getAll);
}
{ withCredentials: true }

// ├─ project-name/
// | ├─ client/
// | | ├─ node_modules/
// | | ├─ public/
// | | ├─ src/
// | | ├─ package.json
// | ├─ server/
// | | ├─ config/
// | | ├─ controllers/
// | | ├─ node_modules/
// | | ├─ models/
// | | ├─ routes/
// | | ├─ package.json
// | | ├─ server.js
// **********************************************echo node_modules/ > .gitignore
// cd client
// npm run build
// rmdir /s .git
// del /f .gitignore

// Next we will initialize a git repository,
//  add all of our code to it (ignoring node_modules) and create a commit with the message "initial commit".

// cd ..
// git init
// git add .
// git commit -m "initial commit"

// git remote add origin https://github.com/your_github_username/MERN-Deployment.git
// git push -u origin master

// chmod 400 keyname.pem
// ssh -i "keyname.pem" ubuntu@ec2-XXX-XXX-XXX-XXX.compute-1.amazonaws.com
