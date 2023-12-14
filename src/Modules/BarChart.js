import React, { useContext, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ProdListContext } from './ProdListContext';

const BarChart = () => {
  const { boughtProducts } = useContext(ProdListContext);
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 250,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#000000'],
        },
      },
      xaxis: {
        categories: [],
        labels: {
          formatter: function (value) {
            return `₱${value}`;
          },
        },
      },
      colors: ['#1fe074'],
      title: {
        text: 'Sales Chart',
        align: 'center',
      },
    },
  });

  useEffect(() => {
    if (boughtProducts.length > 0) {
      const salesData = {};
      boughtProducts.forEach((item) => {
        if (!salesData[item.prodName]) {
          salesData[item.prodName] = item.price * item.quantity;
        } else {
          salesData[item.prodName] += item.price * item.quantity;
        }
      });

      const categories = Object.keys(salesData);
      const series = Object.values(salesData);

      setChartData((prevChartData) => ({
        ...prevChartData,
        series: [{
          name: 'Total Sales',
          data: series,
        }],
        options: {
          ...prevChartData.options,
          xaxis: {
            categories: categories,
          },
        },
      }));
    }
  }, [boughtProducts]);

  return (
    <div id="chart">
      <Chart options={chartData.options} series={chartData.series} type="bar" height={300} />
    </div>
  );
};

export default BarChart;
