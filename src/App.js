import React, { useState, useEffect } from 'react';
import './App.css';
import { MenuItem, FormControl, Select, Card, CardContent }  from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './utils'

const API_URL = 'https://disease.sh/v3/covid-19/countries';
const API_ALL_URL = 'https://disease.sh/v3/covid-19/all';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch(API_ALL_URL)
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, [])

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
        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      });
    };
    getCountriesData();
  }, []);

  const onCountryClicked = async (event) => {
    const countryCode = event.target.value;
    const url = countryCode === 'worldwide' ? API_ALL_URL : API_URL + `/${countryCode}`;
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
    })
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
          <InfoBox title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>

        {/* MAP */}
        <Map />

      </div>

      {/* RIGHT COLUMN */}
      <Card className='right_column'>
        <CardContent>
        <h3> Live Cases </h3>
        {/* LEADERBOARD */}
        <Table countries={tableData}/>
        {/* GRAPH */}

        </CardContent>
      </Card>

    </div>
  );
}

export default App;
