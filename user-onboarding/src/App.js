import React, { useState, useEffect } from 'react'
import './App.css'

import axios from 'axios'
import * as yup from 'yup'

import Form from './components/Form'



function App() {

  // Ability to toggle the button when fields are complete 
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const[ users, setUsers ] = useState([])
const addNewUser = user => {
  setUsers([...users, user])
}


  return (
    <div className="App">
      <h1>New Here? Sign Up!</h1>
      <Form addNewUser={addNewUser} />
      <ul>
        {users.map(user => <li key={user.id}> {user.name} {user.email}</li>)}
      </ul>
    </div>
  );
}

export default App;
