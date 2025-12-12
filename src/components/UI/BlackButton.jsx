import classes from './BlackButton.module.css';

const BlackButton = (props) => {
    return (
        <button onClick={props.onClick} className={`${classes.blackButton} ${props.className}`}>{props.children}</button>
    )
}

export default BlackButton;