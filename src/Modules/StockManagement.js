import React, { useState, useContext } from 'react';
import { ProdListContext } from './ProdListContext';


const StockManagement = () => {
  const { prodList, setProdList } = useContext(ProdListContext);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    <div className="container">
      <div className="row">
        <div className="col">
          <h2 className="float-start">Stock Management</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table table-responsive custom-table-width">
            <thead className="text-center">
              <tr>
                <th scope="col" className="bg-primary text-white">Product ID</th>
                <th scope="col" className="bg-primary text-white">Name</th>
                <th scope="col" className="bg-primary text-white">Stock</th>
                <th className="bg-primary text-white">Action</th>
              </tr>
            </thead>
            <tbody id="tbodyproducts" className="text-center">
              {prodList
              .map((product, index) => (
                <tr key={index}>
                  <td>{product.productId}</td>
                  <td>{product.prodName}</td>
                  <td className={product.stock === 0 ? 'text-danger' : ''}>
                  {product.stock === 0 ? 'Out of Stock' : product.stock}
                </td>
                  <td>
                    <button className="btn btn-primary me-2" onClick={() => handleEditProduct(product)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDeleteProduct(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showProductModal && selectedProduct && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog" style={{ margin: '10% auto' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Stock</h5>
                <button type="button" className="btn-close" color="none" aria-label="Close" onClick={() => setShowProductModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="editProdStock">Stock</label>
                    <input
                      type="number" className="form-control" id="editProdStock"
                      value={selectedProduct.stock}
                      onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: e.target.value })}
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
  );
};

export default StockManagement;
