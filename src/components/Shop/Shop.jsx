import React, { useEffect, useState } from "react";
import Cart from "../../Cart/Cart";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

//   useEffect(() => {
//     const storedCart = getShoppingCart();
//     //Step-1: Get id
//     for(const id in storedCart) {
//       // console.log(id);
//       //Step-2: find the product by using id
//       const addedProduct = products.find(product => product.id === id);
     
//       console.log(addedProduct);
//     //   Step-3: Get quantity of the product
//     const quantity = storedCart[id];
  
      
      
//     }
//   }, [products]);
useEffect( () =>{
    const storedCart = getShoppingCart();
    const savedCart = [];
    for(const id in storedCart){
        //Step-2: get product from products state by using id.
        const addedProduct = products.find(product => product.id ===id);
        if(addedProduct){
            //step-3:
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            //Step-4: add the added product to the saved cart.
            savedCart.push(addedProduct);
        }
        // console.log(addedProduct)

    }

    //Step-5: Set the cart
    setCart(savedCart);
}, [products])

  const handleToCart = (product) => {
    let newCart =[];
    // const newCart = [...cart, product];

    // if product doesn't exist in the cart than set quantity -1/
    //If exist update quantity by 1
    const exist = cart.find(pd=> pd.id===product.id);
    if(!exist){
      product.quantity =1;
      newCart =[...cart, product]
    }
else{
  exist.quantity = exist.quantity +1;
  const remaining = cart.filter(pd => pd.id !==product.id);
  newCart =[...remaining, exist];
}

    setCart(newCart);
    addToDb(product.id);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleToCart={handleToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
