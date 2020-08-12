import React, { useState, useEffect } from 'react';
import './App.css';
import { MenuItem, FormControl, Select, Card, CardContent }  from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import Graph from './Graph';
import 'leaflet/dist/leaflet.css';
import { sortData, prettyPrintStat } from './utils';

const API_URL = 'https://disease.sh/v3/covid-19/countries';
const API_ALL_URL = 'https://disease.sh/v3/covid-19/all';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.8076, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');

  useEffect(() => {
    const setInfo = async () => {
      fetch(API_ALL_URL)
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
    };
    setInfo();
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
        setMapCountries(data);
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
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
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
          <InfoBox isRed active={casesType==='cases'} onClick={e => setCasesType('cases')} title="Coronavirus cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}/>
          <InfoBox active={casesType==='recovered'} onClick={e => setCasesType('recovered')} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}/>
          <InfoBox isRed active={casesType==='deaths'} onClick={e => setCasesType('deaths')} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}/>
        </div>

        {/* MAP */}
        <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />

      </div>

      {/* RIGHT COLUMN */}
      <Card className='right_column'>
        <CardContent>
          <div className="app__information">
          <h3> Leaderboard </h3>
          {/* LEADERBOARD */}
          <Table countries={tableData}/>
          {/* GRAPH */}
          <h3 className="app__graph_title"> New {casesType} </h3>
          <Graph className="app__graph" casesType={casesType}/>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
