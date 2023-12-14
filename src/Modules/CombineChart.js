import React from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';

const CombinedCharts = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#f5f5f5', 
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '1400px', 
    margin: '0 auto', 
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
  };

  const chartContainerStyle = {
    flex: '1',
    margin: '0 10px',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)', 
    borderRadius: '8px',
    padding: '10px',
    backgroundColor: '#fff',
    minWidth: '500px',
  };

  return (
    <div className="combined-charts-container" style={containerStyle}>
      <div className="bar-chart-container" style={chartContainerStyle}>
        <BarChart />
      </div>
      <div className="line-chart-container" style={chartContainerStyle}>
        <LineChart />
      </div>
    </div>
  );
};

export default CombinedCharts;
