import React, {useState} from 'react';
import { ProdListProvider } from './Modules/ProdListContext';
import ProdManagement from './Modules/ProductManagement';
import StockManagement from './Modules/StockManagement';
import CategoryManagement from './Modules/CategoryManagement';
import TransactionReport from './Modules/TransactionReport';
import TransactionManagement from './Modules/TransactionManagement';
import LineChart from './Modules/LineChart';
import BarChart from './Modules/BarChart';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('Product Management');

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

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
      return <LineChart />;
    } else if (selectedTab === 'Transaction Report') {
      return <TransactionReport />;
    } else if (selectedTab === 'Bar Chart') {
      return <BarChart />;
    }
    return null;
  };

  return (
    <ProdListProvider>
      <div>
        <Tabs
          id="tab-navigation"
          activeKey={selectedTab}
          onSelect={handleTabSelect}
          className="mb-3"
          justify
        >
          <Tab eventKey="Product Management" title="Products">
            {TabContent()}
          </Tab>
          <Tab eventKey="Category Management" title="Categories">
            {TabContent()}
          </Tab>
          <Tab eventKey="Transaction Management" title="Transactions">
            {TabContent()}
          </Tab>
          <Tab eventKey="Stock Management" title="Stocks">
            {TabContent()}
          </Tab>
          <Tab eventKey="Transaction Report" title="Report">
            {TabContent()}
          </Tab>
          <Tab eventKey="Line Chart" title="Stock Line Graph">
            {TabContent()}
          </Tab>
          <Tab eventKey="Bar Chart" title="Sales Bar Graph">
            {TabContent()}
          </Tab>
        </Tabs>
      </div>
    </ProdListProvider>
  );
};

export default App;
