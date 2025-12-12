import classes from "./Square.module.css";

const Square = (props) => {
    return <button onClick={props.onClick} className={classes.square}></button>
}

export default Square;