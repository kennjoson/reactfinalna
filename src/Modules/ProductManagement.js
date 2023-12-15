import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { styles } from "./Styles";
import './styles.css';
import { ProdListContext } from './ProdListContext';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';



const ProdManagement = () => {
  const {productId,prodList, setProdList, categories, addProduct } = useContext(ProdListContext);
  const [prodName, setProdName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const handleButton = (event) => {
    event.preventDefault();

    if (!prodName || !price || !stock || !selectedCategory) {
      alert('Please fill in all field required!!');
      return false;
    }

    if (parseInt(stock) === 0) {
      alert('Please input a stock value greater than zero!');
      return false;
    }
    
    addProduct(prodName, price, stock, selectedCategory);

    setProdName('');
    setPrice('');
    setStock('');
    setSelectedCategory('');
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleSaveProductEdit = (updatedProduct) => {
    const updatedList = prodList.map((product) =>
      product.productId === updatedProduct.productId ? updatedProduct : product
    );
    setProdList(updatedList);
    setShowProductModal(false);
  };
  
  const handleDeleteProduct = (index) => {
    const updatedProdList = [...prodList];
    updatedProdList.splice(index, 1);
    setProdList(updatedProdList);
  };

  return (
    <div className="row" style={fullPageStyles}>
      <div className="col-lg-4" style={boxStyles}>
        <form style={formStyles}>
          <h4 style={{textAlign:'center', marginTop:'2%'}}>Product Management</h4>
          <label htmlFor="prodId">
            <b>Product ID</b>
          </label>
          <input type="text" id="productId" readOnly value={productId} required style={styles.inputStyles}/>
        
          <InputGroup size="md">
          <InputGroup.Text id="inputGroup-sizing-lg">Name:</InputGroup.Text>
        <Form.Control style={{padding:"2%"}} type="product" id="prodName" value={prodName}
              onChange={(e) => setProdName(e.target.value)}/>
        </InputGroup>
      
        <br/>
        <InputGroup size="md">
        <InputGroup.Text id="inputGroup-sizing-lg">Price:</InputGroup.Text>
          <Form.Control style={{padding:"2%"}} type="number"id="Price" name="Price"value={price}
                onChange={(e) => setPrice(e.target.value)}/>
        </InputGroup>
         
       <br/>

          
          <InputGroup size="md">
          <InputGroup.Text id="inputGroup-sizing-lg">Stock:</InputGroup.Text>
          <FormControl style={{padding:"2%"}} type="number" id="stock" name="stock" value={stock}
              onChange={(e) => setStock(e.target.value)}/>
         </InputGroup>
         <br/>
          <Form.Select style={{padding:"2%"}} size="md"
            id="filterCategory"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>Select Category--</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>  
          <br/>
          <button className="bg-primary btn-sm" type="submit" style={styles.buttonStyles} onClick={handleButton }>
          Submit
          </button>
        </form>
      </div>
      <div className="col-md-8">
             
    <table className="table table-responsive">
      <thead className="text-center">
        <tr>
          <th scope="col" className="bg-danger text-white">Product ID</th>
          <th scope="col" className="bg-warning text-white">Name</th>
          <th scope="col" className="bg-warning text-white">Price</th>
          <th scope="col" className="bg-warning text-white">Stock</th>
          <th scope="col" className="bg-warning text-white">Category</th>
          <th scope="col" className="bg-warning text-white">Action</th>
        </tr>
      </thead>
      <tbody id="tbodyproducts" className="text-center">
        {prodList
        .filter((product) => product.stock > 0)
        .map((product, index) => (
              <tr key={index}>
                <td>{product.productId}</td>
                <td>{product.prodName}</td>
                <td>₱{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.prodCategory}</td> 
                <td>
                  <button class="btn btn-primary me-1" onClick={() => handleEditProduct(product)}>Update</button>
                  <button class="btn btn-danger" onClick={() => handleDeleteProduct(index)}>Delete</button>
                </td>       
              </tr>
            ))}
      </tbody>
    </table>
  {showProductModal && selectedProduct && (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog" style={{ margin: '10% auto' }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Product</h5>
            <button type="button" className="btn-close" color="none" aria-label="Close" onClick={() => setShowProductModal(false)}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="editProdName">Product Name</label>
                <input
                  type="text" className="form-control" id="editProdName"
                  value={selectedProduct.prodName}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, prodName: e.target.value })}
                />
              </div>
            <div className="form-group">
              <label htmlFor="editProdPrice">Price</label>
              <input
                type="number" className="form-control" id="editProdPrice"
                value={selectedProduct.price}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
              />
            </div>

          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={() => setShowProductModal(false)}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSaveProductEdit(selectedProduct)}>
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
)}



  </div>
    </div>
  );
};

const boxStyles = {
  boxShadow: '7px 8px 10px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: '#fff', 
  height: '50%',
};
const formStyles = {
    fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
    backgroundColor: 'white',
    padding: "0 20px",
    fontSize: '16px',
  };

  const fullPageStyles = {
    backgroundColor: '#f5f5f5',
    minHeight: '100vh', 
    padding: '20px', 
  };
  
export default ProdManagement;
