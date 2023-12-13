import React, { useContext, useState } from 'react';
import { ProdListContext } from './ProdListContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const TransactionManagement = () => {
  const { prodList, cartItems, setCartItems, addBoughtProduct } = useContext(ProdListContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [receipt, setReceipt] = useState(null);

  const handleAddToCart = (product) => {
    if (product.stock > 0) {
      setSelectedProduct(product);
      setShowModal(true);
    } else {
      alert('This product is out of stock.');
    }
  };

  const addToCart = () => {
    if (quantity !== '') {
      if (parseInt(quantity) > selectedProduct.stock) {
        alert('Entered quantity exceeds available stock.');
        return;
      }
      const cartItem = {
        productId: selectedProduct.productId,
        prodName: selectedProduct.prodName,
        quantity,
        dateAdded: new Date().toLocaleString(),
        totalItemPrice: selectedProduct.price * quantity,
      };

      const updatedCart = [...cartItems, cartItem];
      setCartItems(updatedCart);

      setShowModal(false);
      setQuantity('');
      setSelectedProduct(null);
    } else {
      alert('Fields are required');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setQuantity('');
  };

  const handleBuyItem = (item) => {
    const selectedProductIndex = prodList.findIndex((product) => product.productId === item.productId);
  
    if (selectedProductIndex !== -1 && prodList[selectedProductIndex].stock >= item.quantity) {
      const selectedProduct = prodList[selectedProductIndex];
      
      const boughtItem = {
        prodName: item.prodName,
        price: selectedProduct.price,
        quantity: item.quantity,
        totalPrice: item.totalItemPrice,
        purchaseDate: new Date().toLocaleDateString(),
      };
  
      // Update stock after purchase
      prodList[selectedProductIndex].stock -= item.quantity;
  
      setReceipt(boughtItem);
  
      const updatedCart = cartItems.filter((cartItem) => cartItem !== item);
      setCartItems(updatedCart);
  
      addBoughtProduct(boughtItem);
    } else {
      alert(selectedProductIndex !== -1 ? 'Product not found.' : 'Not enough stock to complete the order.');
    }
  
    setShowModal(false);
  };

  const handleRemoveItem = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem !== item);
    setCartItems(updatedCart);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-6">
          <h2 className="text-primary mb-4">Transaction Management</h2>
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th className="text-center bg-primary text-white">Product ID</th>
                <th className="text-center bg-primary text-white">Name</th>
                <th className="text-center bg-primary text-white">Price</th>
                <th className="text-center bg-primary text-white">Stock</th>
                <th className="text-center bg-primary text-white">Category</th>
                <th className="text-center bg-primary text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {prodList
                .filter((product) => product.stock > 0)
                .map((product, index) => (
                  <tr key={index}>
                    <td className="text-center">{product.productId}</td>
                    <td className="text-center">{product.prodName}</td>
                    <td className="text-center">₱{product.price}</td>
                    <td className="text-center">{product.stock}</td>
                    <td className="text-center">{product.prodCategory}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-success"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add Order
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title className="text-success text-center">Choose Quantity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p>Product: {selectedProduct ? selectedProduct.prodName : ''}</p>
            <p>Available Stock: {selectedProduct? selectedProduct.stock : ''}</p>
            <div className="form-group">
              <label htmlFor="quantityInput" className="form-label">
                Quantity:
              </label>
              <input
                id="quantityInput"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control text-center"
                placeholder="Enter quantity"
              />
            </div>
          </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="success" onClick={addToCart}>
                Add Order
              </Button>
            </Modal.Footer>
          </Modal>
          {receipt && (
        <Modal show={true} onHide={() => setReceipt(null)}>
          <Modal.Header closeButton>
            <Modal.Title className="text-success text-center">Receipt</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Product Name: {receipt.prodName}</p>
            <p>Price: {receipt.price}</p>
            <p>Quantity: {receipt.quantity}</p>
            <p>Total Price: ₱{receipt.totalPrice}</p>
            <p>Purchase Date: {receipt.purchaseDate}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setReceipt(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
        </div>
        <div className="col-lg-6">
          <h3 className="text-success mb-4 text-center">Summary</h3>
          {cartItems.length > 0 ? (
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th className="text-center">Product Name</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Total Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td className="text-center">{item.prodName}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-center">₱{item.totalItemPrice.toFixed(2)}</td>
                <td className="text-center">
                  <button className="btn btn-success me-2" onClick={() => handleBuyItem(item)}>Place Order</button>
                  <button className="btn btn-danger" onClick={() => handleRemoveItem(item)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-muted">No items in the cart</p>
      )}
        </div>
      </div>
    </div>
  );
};



export default TransactionManagement;
