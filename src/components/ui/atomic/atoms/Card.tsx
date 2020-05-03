import React from "react";
interface ICard {
  title: string;
}

const Card: React.FC<ICard> = ({ children, title }) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default Card;
