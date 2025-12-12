import classes from "./SeeAllButton.module.css";

const SeeAllButton = (props) => {
    return (
        <button className={`${classes.button} ${props.className}`}>See All</button>
    )
}

export default SeeAllButton;