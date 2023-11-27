import React from 'react';
import ProdManagement from './ProductManagement';
import StockManagement from './StockManagement';
import CategoryManagement from './CategoryManagement';
import { ProdListProvider } from './ProdListContext';
import TransactionManagement from './TransactionManagement';
import ApexChart from './LineChart';

const App = () => {
  const [selectedTab, setSelectedTab] = React.useState('Product Management');

  const TabContent = () => {
    if (selectedTab === 'Product Management') {
      return <ProdManagement />;
    } else if (selectedTab === 'Stock Management') {
      return <StockManagement />;
    } else if (selectedTab === 'Category Management') {
      return <CategoryManagement />;
    } else if (selectedTab === 'Transaction Management') {
      return <TransactionManagement />;
    } else if (selectedTab === 'Line Chart') {
      return <ApexChart />;
    }
    return null;
  };

  return (
    <ProdListProvider>
      <div>
        <ul style={{ display: 'flex', listStyle: 'none', justifyContent: 'center' }}>
          <li style={{ marginRight: '10px' }}>
            <button onClick={() => setSelectedTab('Product Management')}>Product Management</button>
          </li>
          <li style={{ marginRight: '10px' }}>
            <button onClick={() => setSelectedTab('Stock Management')}>Stock Management</button>
          </li>
          <li style={{ marginRight: '10px' }}>
            <button onClick={() => setSelectedTab('Category Management')}>Category Management</button>
          </li>
          <li style={{ marginRight: '10px' }}>
            <button onClick={() => setSelectedTab('Line Chart')}>Line Chart</button>
          </li>
        </ul>
        <hr />
        {TabContent()}
      </div>
    </ProdListProvider>
  );
};

export default App;
