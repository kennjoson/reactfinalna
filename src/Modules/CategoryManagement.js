import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { styles } from './Styles';
import { ProdListContext } from './ProdListContext';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';

const CategoryManagement = () => {
  const { categories, setCategories } = React.useContext(ProdListContext);
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
  <div className="row" style={fullPageStyles}>
    <div className="col-lg-4" style={boxStyles}>
      <form style={formStyles} onSubmit={handleNewCategory}>
        <h3 style={{textAlign:'center'}}>Category Management</h3>
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
            <th scope="col" className="bg-danger text-white">Category</th>
            <th className="bg-warning text-white">Action</th>
          </tr>
        </thead>
        <tbody id="tbodyproducts" className="text-center">
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{category}</td>
              <td>
                <button class="btn btn-primary me-1" onClick={() => handleEdit(index)}>Update</button>
                <button class="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody> 
      </table>
        {showCategoryModal && (
      <div className="modal" style={{ display: 'block' }}>
        <div className="modal-dialog" style={{ margin: '10% auto' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Category</h5>
              <button type="button" className="btn-close" color="none" aria-label="Close" onClick={() => setShowCategoryModal(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
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
            </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowCategoryModal(false)}>
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveEdit}
            >
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
padding: '0 20px',
fontSize: '16px',
};

const boxStyles = {
  boxShadow: '7px 8px 10px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: '#fff', 
  height: '50%',
};

const fullPageStyles = {
  backgroundColor: '#f5f5f5',
  minHeight: '100vh', 
  padding: '20px', 
};

export default CategoryManagement;


