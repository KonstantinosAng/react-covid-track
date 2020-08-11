import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';

function Graph() {
  const [data, setData] = useState({})

  const API_CHART_URL = 'https://disease.sh/v3/covid-19/historical/all?lastdays=120';

  useEffect(() => {
    fetch(API_CHART_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
  }, [])

  return (
    <div>
      <h1> I am a graph </h1>
      {/* <Line data options/> */}
    </div>
  )
}

export default Graph
