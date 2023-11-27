import React, { useContext } from 'react';
import Chart from 'react-apexcharts';
import { ProdListContext } from './ProdListContext';

const LineChart = () => {
  const { prodList } = useContext(ProdListContext);

  const categories = prodList.map(product => product.prodName);
  const series = [
    {
      name: 'Stock',
      data: prodList.map(product => product.stock)
    }
  ];

  const chartOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Stock Chart',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
    },
    xaxis: {
      categories: categories
    }
  };

  return (
    <div id="chart">
      <Chart options={chartOptions} series={series} type="line" height={360} width={1300}/>
    </div>
  );
};

export default LineChart;
