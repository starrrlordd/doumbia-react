import classes from "./FourSquare.module.css";

const FourSquare = (props) => {
    return <button onClick={props.onClick} className={classes.fourSquare}>
        <div>
            <div className={classes.topSide}></div>
            <div className={classes.oneSide}></div>
        </div>
        <div>
            <div className={classes.topRightSide}></div>
            <div className={classes.bottomRightSide}></div>
        </div>

    </button>
}

export default FourSquare;