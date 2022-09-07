import React from "react";
import "./Cart.css";
import { CartItemCard } from "./CartItemCard.js";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }

    dispatch(addItemsToCart(id, newQty));
  };
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }

    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography> No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  {/* <div className="subtotal"> */}

                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                    -
                    </button>
                    <input readOnly type="number" value={item.quantity} id="" />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                    <p className="cartSubtotal">{`₹${
                      item.price * item.quantity
                    }`}</p>
                  </div>
                  {/* </div> */}
                </div>
              ))}

            <div className="cartGrossProfit">
                <div className="checkout">

              <div className="cartGrossProfitBox">
             
             <div>
           <span>  <p> Sub Total : 
            
                  {`${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}`}{" "} </p>

           </span> 
               
             </div>
             <br/>
             <div>
           <span><p> Total:  {" "}
                  {`${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}`}{" "} </p>
           </span> 
               

             </div>

            

              </div>
              <div className="checkOutBtn ">
                {" "}
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
                </div>
             

            </div>
          </div>
        </>
      )}
    </>
  );
};
