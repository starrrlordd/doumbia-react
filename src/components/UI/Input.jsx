import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <input
      className={`${classes.input} ${props.className}`}
      id={props.id}
      type={props.type || "text"}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
};

export default Input;
