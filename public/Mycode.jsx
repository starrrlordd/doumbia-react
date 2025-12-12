import React from "react";

const items = ["car", "moto", "bike", "money", "lotta money", "and bitches too"];

const Mycode = () => {
  const itemsClickHandler = (event, item, index) => {
    event.preventDefault();

    console.log(`clicked on ${item} ${index}`);
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            onClick={(event) => itemsClickHandler(event, item, index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Mycode;
