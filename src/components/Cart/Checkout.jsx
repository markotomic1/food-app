import "./Checkout.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isNotFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = !isNotFiveChars(enteredPostal);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostal,
    });
  };
  const invalidInputClasses = (inputValidity) => {
    return `${"control__input"} ${
      inputValidity ? "" : "control__input--invalid"
    }`;
  };
  const errorClass = (validity) => {
    return `${validity ? "" : "control__label--invalid"}`;
  };

  return (
    <form onSubmit={confirmHandler} className='cart__form'>
      <div className='form-control'>
        <label htmlFor='name' className='control__label'>
          Your Name
        </label>
        <input
          type='text'
          id='name'
          className={invalidInputClasses(formInputsValidity.name)}
          ref={nameInputRef}
        />
        {!formInputsValidity.name && (
          <p className={errorClass(formInputsValidity.name)}>
            Please enter a valid name!
          </p>
        )}
      </div>
      <div className='form__control'>
        <label htmlFor='street' className='control__label'>
          Street
        </label>
        <input
          type='text'
          id='street'
          className={invalidInputClasses(formInputsValidity.street)}
          ref={streetInputRef}
        />
        {!formInputsValidity.street && (
          <p className={errorClass(formInputsValidity.street)}>
            Please enter a valid street!
          </p>
        )}
      </div>
      <div className='form__control'>
        <label htmlFor='postal' className='control__label'>
          Postal Code
        </label>
        <input
          type='text'
          id='postal'
          className={invalidInputClasses(formInputsValidity.postalCode)}
          ref={postalInputRef}
        />
        {!formInputsValidity.postalCode && (
          <p className={errorClass(formInputsValidity.postalCode)}>
            Please enter a valid postal!
          </p>
        )}
      </div>
      <div className='form__control'>
        <label htmlFor='city' className='control__label'>
          City
        </label>
        <input
          type='text'
          id='city'
          className={invalidInputClasses(formInputsValidity.city)}
          ref={cityInputRef}
        />
        {!formInputsValidity.city && (
          <p className={errorClass(formInputsValidity.city)}>
            Please enter a valid city!
          </p>
        )}
      </div>
      <div className='form__actions'>
        <button className='actions__button' onClick={props.onCancel}>
          Cancel
        </button>
        <button
          type='submit'
          className='actions__button actions__button--submit'
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
