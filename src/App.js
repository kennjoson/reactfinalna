import React, {useState} from 'react';
import { ProdListProvider } from './Modules/ProdListContext';
import ProdManagement from './Modules/ProductManagement';
import StockManagement from './Modules/StockManagement';
import CategoryManagement from './Modules/CategoryManagement';
import TransactionReport from './Modules/TransactionReport';
import TransactionManagement from './Modules/TransactionManagement';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CombinedCharts from './Modules/CombineChart';

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
    } else if (selectedTab === 'Transaction Report') {
      return <TransactionReport />;

    } else if (selectedTab === 'Combined Chart') {
      return <CombinedCharts />;
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
          className="mb-1"
          justify
          variant="pills"
        >
          <Tab eventKey="Product Management" title="Products" >
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
          <Tab eventKey="Combined Chart" title="Charts">
            {TabContent()}
          </Tab>
        </Tabs>
      </div>
    </ProdListProvider>
  );
};

export default App;
