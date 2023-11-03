import React from "react";
import "./Header.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className='header'>
        <h1 className='header__heading'>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart}>Cart</HeaderCartButton>
      </header>
      <div className='imgcontainer'>
        <img
          src={mealsImage}
          alt='A table full of delicious food'
          className='imgcontainer__image'
        />
      </div>
    </>
  );
};

export default Header;
