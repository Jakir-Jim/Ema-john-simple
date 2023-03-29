import React from 'react';
import './Cart.css'

const Cart = ({cart}) => {
    console.log(cart);
    // const cart = props.cart;  //Option-1
    // const {cart} = props;  //Option-2
    let total =0;
    let totalShipping = 0;
    let quantity =0;
    for(const product of cart){
        if(product.quantity===0){
            product.quantity =1
        }
        // product.quantity = product.quantity || 1;
        total = total + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping * product.quantity;
        quantity = quantity + product.quantity;
    }
    const tax =(total*7/100).toFixed(2);
    const grandTotal = parseFloat(total) + parseFloat(totalShipping) + parseFloat(tax);
   
    return (
        <div className='cart'>
              <h4>Order Summery</h4>
                <p>Selected Items: {quantity}</p>
                <p>Total Price: ${total} </p>
                <p>Shipping: ${totalShipping} </p>
                <p>Tax: ${tax}</p>
                <h6>Grand Total: {grandTotal.toFixed(2)}</h6>
            
        </div>
    );
};

export default Cart;