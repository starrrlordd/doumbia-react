import classes from "./DoubleRectangle.module.css";

const DoubleRectangle = (props) => {
    return <button onClick={props.onClick} className={classes.doubleRectangle}>
        <div className={classes.leftSide}></div>
        <div className={classes.oneSide}></div>
    </button>
}

export default DoubleRectangle;