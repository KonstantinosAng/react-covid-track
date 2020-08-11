import React, { useState, useEffect } from 'react';
import './App.css';
import { MenuItem, FormControl, Select }  from '@material-ui/core';

const API_URL = 'https://disease.sh/v3/covid-19/countries';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect(() => {

    const getCountriesData = async () => {
      await fetch (API_URL)
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country, // full name Greece
            value: country.countryInfo.iso2 // short name GR 
          }));
        setCountries(countries);
      });
    };
    getCountriesData();
  }, [countries]);

  const onCountryClicked = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      {/* HEADER */}
      <div className='app__header'>        
      <h1> COVID-19 TRACKER </h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" value={country} onChange={onCountryClicked}>
          <MenuItem value='worldwide'>Worldwide</MenuItem>
          {/* Loop through countries to create option in menu */}
          {
            countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      </div>
      
      {/* STATISTICS */}
      <div className="app__stats">
        
      </div>
    </div>
  );
}

export default App;
