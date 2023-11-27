import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { styles } from "./Styles";
import './styles.css';
import { ProdListContext } from './ProdListContext';


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
    <div className="row">
      <div className="col-lg-4">
        <form style={formStyles}>
          <h4>Product Management</h4>
          <label htmlFor="prodId">
            <b>Product ID</b>
          </label>
          <input type="text" id="productId" readOnly value={productId} required style={styles.inputStyles}/>

          <label htmlFor="prodname"><b>Product Name</b></label>
          <input type="text" id="prodName" value={prodName} 
              onChange={(e) => setProdName(e.target.value)} required style={styles.inputStyles}/>

          <label htmlFor="sellprice"><b>Price</b></label>
          <input type="number" id="Price" name="Price" value={price}
              onChange={(e) => setPrice(e.target.value)} required style={styles.inputStyles}/>

          <label htmlFor="stocks"><b>Stock</b></label>
          <input type="number" id="stock" name="stock" value={stock}
              onChange={(e) => setStock(e.target.value)} required style={styles.inputStyles}/>
          

          <select
            id="filterCategory"
            style={{ border: '1px solid #c2c0ca', width: '100%', padding: '15px', borderRadius: '8px',}}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>Select Category--</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>


          <button 
            className="bg-primary btn-sm" 
            type="submit" 
            id="btn" 
            onClick={handleButton} 
            style={styles.buttonStyles}
          >
            Add
          </button>
        </form>
      </div>
      <div className="col-lg-8">
             
    <table className="table table-responsive">
      <thead className="text-center">
        <tr>
          <th scope="col" className="bg-primary text-white">Product ID</th>
          <th scope="col" className="bg-primary text-white">Name</th>
          <th scope="col" className="bg-primary text-white">Price</th>
          <th scope="col" className="bg-primary text-white">Stock</th>
          <th scope="col" className="bg-primary text-white">Category</th>
          <th scope="col" className="bg-primary text-white">Action</th>
        </tr>
      </thead>
      <tbody id="tbodyproducts" className="text-center">
        {prodList.map((product, index) => (
              <tr key={index}>
                <td>{product.productId}</td>
                <td>{product.prodName}</td>
                <td>₱{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.prodCategory}</td> 
                <td>
                  <button class="btn btn-primary" onClick={() => handleEditProduct(product)}>Update</button>
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
const formStyles = {
    fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
    backgroundColor: 'white',
    padding: "0 20px",
    fontSize: '16px',
  };
  
export default ProdManagement;
