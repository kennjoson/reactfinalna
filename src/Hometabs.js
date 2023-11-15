import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './styles.css';
import ProdManagement from './ProductManagement';
import CatManagement from './CategoryManagement';
function NavTabs() {
  return (
    <>
    <Tabs
      defaultActiveKey="product"
      id="uncontrolled-tab"
      className="mb-3 custom-tabs"
      fill
    >
      <Tab eventKey="home" title="Sales">
        Tab content for Sales
      </Tab>
      <Tab eventKey="product" title="Product Management">
        <ProdManagement/>
      </Tab>
      <Tab eventKey="category" title="Category Management">
        <CatManagement/>
      </Tab>
      <Tab eventKey="transaction" title="Transaction Management">
        Tab content for Transaction Management
      </Tab>
      <Tab eventKey="stocks" title="Stocks Management">
        Tab content for Stocks Management
      </Tab>
      <Tab eventKey="report" title="Transaction Report">
        Tab content for Transaction Report
      </Tab>
    </Tabs>
    </>
  );
}

export default NavTabs;