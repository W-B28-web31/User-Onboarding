import React from 'react'
import './App.css'
import * as yup from 'yup'

import Form from './components/Form'
import Card from './components/Card'

function App() {
  return (
    <div className="App">
      <h1>New Here? Sign Up!</h1>
      <Form />
      <Card />
    </div>
  );
}

export default App;
