import React, { useContext, useEffect, useState } from "react";
import "./HeaderCartButton.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartContext = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const numberOfCartItems = cartContext.items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);

  const { items } = cartContext;

  useEffect(() => {
    if (cartContext.items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button
      className={`headerbtn ${btnIsHighlighted ? "bump" : ""}`}
      onClick={props.onClick}
    >
      <span className='headerbtn__icon'>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className='headerbtn__badge'>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
