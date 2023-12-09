import React, { useContext, useState } from 'react';
import { ProdListContext } from './ProdListContext';

const TransactionReport = () => {
  const { boughtProducts } = useContext(ProdListContext);
  const [sortType, setSortType] = useState('none');


  const sortProducts = (type) => {
    let sortedProducts = [...boughtProducts];
    if (type === 'ascending') {
      sortedProducts.sort((a, b) => a.quantity - b.quantity);
    } else if (type === 'descending') {
      sortedProducts.sort((a, b) => b.quantity - a.quantity);
    }
    return sortedProducts;
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  let sortedBoughtProducts = [...boughtProducts];
  if (sortType === 'ascending' || sortType === 'descending') {
    sortedBoughtProducts = sortProducts(sortType);
  }

  return (
    <div className="container mt-4">
      <div className="card bg-light">
        <div className="card-body">
          <h2 className="card-title text-primary mb-3 text-center">Transaction Report</h2>
          <div className="mb-3">
            <div className="d-flex">
          <div className="ms-auto" style={{ minWidth: '250px' }}>
          <label htmlFor="sortDropdown" className="form-label mt-2">
              Sort By Transaction Count: (based on quantity)
            </label>
            <select
              id="sortDropdown"
              className="form-select w-100"
              onChange={handleSortChange}
              value={sortType}
            >
              <option value="none">Select</option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>
        </div>
      </div>
          {sortedBoughtProducts.length > 0 ? (
            <table className="table table-hover">
               <thead className="thead-dark">
                <tr>
                  <th className="text-center bg-primary text-white">Product Name</th>
                  <th className="text-center bg-primary text-white">Price</th>
                  <th className="text-center bg-primary text-white">Quantity</th>
                  <th className="text-center bg-primary text-white">Total Price</th>
                  <th className="text-center bg-primary text-white">Purchase Date</th>
                </tr>
              </thead>
              <tbody>
                {sortedBoughtProducts.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{item.prodName}</td>
                    <td className="text-center">₱{item.price}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-center">
                      {item.totalPrice ? `₱${item.totalPrice.toFixed(2)}` : 'N/A'}
                    </td>
                    <td className="text-center">{item.purchaseDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-muted">No items in the transaction report</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionReport;
