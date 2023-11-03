import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import "./Cart.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem.jsx";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [error, setError] = useState("");
  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items?.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };
  const handleOrder = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmiting(true);
    try {
      const response = await fetch(
        "https://react-http-4e903-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartContext.items,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong when sending order!");
      }
    } catch (error) {
      setError(error.message || "Something went wrong");
    }
    setIsSubmiting(false);
    setDidSubmit(true);
    cartContext.clearCart();
  };

  const cartItems = (
    <ul className='cart-items'>
      {cartContext.items?.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={() => {
            cartItemAddHandler(item);
          }}
          onRemove={() => {
            cartItemRemoveHandler(item.id);
          }}
        >
          {item.name}
        </CartItem>
      ))}
    </ul>
  );
  const modalActions = (
    <div className='actions'>
      <button
        className='actions__close actions__button'
        onClick={props.onClose}
      >
        Close
      </button>
      {hasItems && (
        <button
          className='actions__order actions__button'
          onClick={handleOrder}
        >
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className='total'>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!isCheckout && modalActions}
    </>
  );
  const isSubmitingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className='actions'>
        <button
          className='actions__close actions__button'
          onClick={props.onClose}
        >
          Close
        </button>
      </div>
    </>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !didSubmit && cartModalContent}
      {isSubmiting && isSubmitingModalContent}
      {!isSubmiting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
