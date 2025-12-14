import React, { useContext } from "react";
import classes from "./FilterBar.module.css";
import Square from "../UI/FilterBoxes/Square";
import DoubleRectangle from "../UI/FilterBoxes/DoubleRectangle";
import FourSquare from "../UI/FilterBoxes/FourSquare";
import { WindowSizeContext } from "../../store/windowSize-context";

const FilterBar = ({ items, onFilterSelect, onGridChange }) => {
  const { isMobileSize } = useContext(WindowSizeContext);

  return (
    <div className={classes.filterBar}>
      <h4>shop</h4>
      <div className={classes.fo}>
        <h4>Filter and order</h4>

        {isMobileSize && (
          <div className={classes.filterGrid}>
            <Square
              onClick={() => {
                onGridChange(1);
              }}
            />
            <DoubleRectangle
              onClick={() => {
                onGridChange(2);
              }}
            />
            <FourSquare
              onClick={() => {
                onGridChange(3);
              }}
            />
          </div>
        )}
      </div>
      <ul className={classes.filter}>
        {items.map((item, index) => (
          <li key={index} onClick={() => onFilterSelect(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterBar;
