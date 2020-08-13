import React, {useState, useEffect} from 'react';
import { buildChartData } from './utils';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format('+0,0');
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: 'MM/DD/YY',
          tootipFormat: 'll',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format('0a');
          },
        },
      },
    ],
  },
}

function Graph({ casesType='cases'}) {
  const [data, setData] = useState({});

  const API_CHART_URL = 'https://disease.sh/v3/covid-19/historical/all?lastdays=120';

  useEffect(() => {
    const fetchData = async () => {
      await fetch(API_CHART_URL)
      .then((response) => response.json())
      .then((data) => {
        const chartData = buildChartData(data, casesType);
        setData(chartData);
      })
    }
    fetchData();
  }, [casesType]);

  return (
    <div className="app__graph">
      {data?.length > 0 && (
        <Line 
          options={options}
          data={{
            datasets: [{
              backgroundColor: 'rgba(204, 16, 52, .5)',
              borderColor: "#CC1034",
              data: data
            }]
          }}
        />
      )}
    </div>
  );
}

export default Graph
