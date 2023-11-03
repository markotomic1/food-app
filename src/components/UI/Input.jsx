import React from "react";
import "./Input.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className='input'>
      <label htmlFor={props.input.id} className='input__label'>
        {props.label}
      </label>
      <input {...props.input} className='input__input' ref={ref} />
    </div>
  );
});

export default Input;
