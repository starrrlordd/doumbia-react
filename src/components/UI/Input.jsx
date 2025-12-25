import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <input
      className={`${classes.input} ${props.className}`}
      id={props.id}
      type={props.type || "text"}
      placeholder={props.placeholder}
      onChange={props.onChange}
      name={props.name}
      required={props.required}
      
    />
  );
};

export default Input;
