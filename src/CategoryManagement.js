import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { styles } from './Styles';
import { ProdListContext } from './ProdListContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CategoryManagement = () => {
  const { categories, setCategories } = React.useContext(ProdListContext); // Access the categories from the context
  const [newCategory, setNewCategory] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editedCategory, setEditedCategory] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleNewCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() !== '' && !categories.find((category) => category === newCategory)) {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      setNewCategory('');
    } else {
      alert(' This category is already added!');
    }
  };

  const handleEdit = (index) => {
    setEditedCategory(categories[index]);
    setEditIndex(index);
    setShowCategoryModal(true);
  };

  const handleSaveEdit = () => {
    if (editedCategory.trim() !== '') {
      const updatedCategories = [...categories];
      updatedCategories[editIndex] = editedCategory;
      setCategories(updatedCategories);
      setShowCategoryModal(false);
    }
  };

  const handleDelete = (index) => {
    const updatedCategories = categories.filter((_, idx) => idx !== index);
    setCategories(updatedCategories);
  };


  return (
  <div className="row">
    <div className="col-lg-4">
      <form style={formStyles} onSubmit={handleNewCategory}>
        <h3>Category Management</h3>
        <label htmlFor="prodCategory">
          <b>Set Category</b>
        </label>
        <input
          type="text"
          id="prodCategory"
          placeholder="Enter new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
          style={styles.inputStyles}
        />
        <button className="bg-primary btn-sm" type="submit" style={styles.buttonStyles}>
          Add Category
        </button>
      </form>
    </div>
    <div className="col-lg-8">
      <table className="table table-responsive">
        <thead className="text-center">
          <tr>
            <th scope="col" className="bg-primary text-white">Category</th>
            <th className="bg-primary text-white">Action</th>
          </tr>
        </thead>
        <tbody id="tbodyproducts" className="text-center">
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{category}</td>
              <td>
                <button class="btn btn-primary" onClick={() => handleEdit(index)}>Update</button>
                <button class="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody> 
      </table>
          {showCategoryModal && (
      <Modal show={showCategoryModal} onHide={() => setShowCategoryModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="editCategoryName">Category Name</label>
              <input
                type="text"
                className="form-control"
                id="editCategoryName"
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)} 
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCategoryModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    )}
    </div>
  </div>
);
};

const formStyles = {
fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
backgroundColor: 'white',
padding: '0 20px',
fontSize: '16px',
};

export default CategoryManagement;


