import React from 'react';
import './App.css';
import { MenuItem, FormControl, Select }  from '@material-ui/core';

function App() {

  

  return (
    <div className="app">
      <div className='app__header'>        
      <h1> COVID-19 TRACKER </h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" value='abc'>
          
        </Select>
      </FormControl>
      </div>
    </div>
  );
}

export default App;
