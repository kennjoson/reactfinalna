import React, { useContext } from 'react';
import { ProdListContext } from './ProdListContext';

const TransactionReport = () => {
  const { boughtProducts } = useContext(ProdListContext);

  return (
    <div className="container mt-4">
      <div className="card bg-light">
        <div className="card-body">
          <h2 className="card-title text-primary mb-4">Transaction Report</h2>
          {boughtProducts.length > 0 ? (
            <table className="table table-bordered table-hover">
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
                {boughtProducts.map((item, index) => (
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
