import React, { useContext, useState } from 'react';
import { ProdListContext } from './ProdListContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const TransactionManagement = () => {
  const { prodList,cartItems,setCartItems } = useContext(ProdListContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('');

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const addToCart = () => {
    const cartItem = {
      productId: selectedProduct.productId,
      prodName: selectedProduct.prodName,
      quantity,
    };
    setCartItems([...cartItems, cartItem]);
    setShowModal(false);
    setQuantity('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setQuantity('');
  };

  return (
    <div className='row'>
      <div className="col-lg-8">
      <h2>Transaction Management</h2>
      <table className="table table-responsive">
        <thead className="text-center">
          <tr>
            <th scope="col" className="bg-primary text-white">Product ID</th>
            <th scope="col" className="bg-primary text-white">Name</th>
            <th scope="col" className="bg-primary text-white">Price</th>
            <th scope="col" className="bg-primary text-white">Stock</th>
            <th scope="col" className="bg-primary text-white">Category</th>
            <th className="bg-primary text-white">Action</th>
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
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addToCart}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      <div className="col-lg-4">
        <h3>Cart Items</h3>
          {cartItems.map((item, index) => (
            <h4 key={index}>{`${item.prodName} - ${item.quantity}`}</h4>
          ))}
      </div>
   </div>
  );
};

export default TransactionManagement;
