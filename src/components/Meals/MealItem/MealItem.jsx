import { useContext } from "react";
import "./MealItem.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartContext = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      amount,
      price: props.price,
    });
  };
  return (
    <li className='meal'>
      <div>
        <h3 className='meal__heading'>{props.name}</h3>
        <div className='meal__description'>{props.description}</div>
        <div className='meal__price'>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
