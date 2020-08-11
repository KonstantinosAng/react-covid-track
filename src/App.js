import React, { useState, useEffect } from 'react';
import './App.css';
import { MenuItem, FormControl, Select, Card, CardContent }  from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';

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

      {/* LEFT COLUMN */}
      <div className='left_column'>

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

        {/* INFO STATISTICS BELOW HEADER */}
        <div className="app__stats">
          <InfoBox title="Coronavirus cases" total={2000}/>
          <InfoBox title="Recovered" total={3000}/>
          <InfoBox title="Deaths" total='4000'/>
        </div>

        {/* MAP */}
        <Map />

      </div>

      {/* RIGHT COLUMN */}
      <Card className='right_column'>
        <CardContent>
          
        {/* LEADERBOARD */}

        {/* GRAPH */}

        </CardContent>
      </Card>

    </div>
  );
}

export default App;
