import classes from "./LoadingModal.module.css";

const LoadingModal = () => {
  return (
    <div className={classes.loadingBackdrop}>
      <div className={classes.loadingModal}>
        <p>Please wait...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
