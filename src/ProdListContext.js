import React, { createContext, useState } from 'react';

export const ProdListContext = createContext();

export const ProdListProvider = ({ children }) => {
  const [prodList, setProdList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [productId, setProductId] = useState('ITEM-1');

  const ProductId = () => {
    const newCount = count + 1;
    setCount(newCount);
    const string = 'ITEM-';
    const newProductId = string + newCount;
    setProductId(newProductId);
    return newProductId;
  };

  const addProduct = (prodName, price, stock, prodCategory) => {
    const newProductId = ProductId();

    const newProduct = { productId: newProductId, prodName, price, stock, prodCategory };
    setProdList([...prodList, newProduct]);
  };

  return (
    <ProdListContext.Provider
      value={{
        productId,
        prodList,
        setProdList,
        categories,
        setCategories,
        addProduct,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </ProdListContext.Provider>
  );
};
