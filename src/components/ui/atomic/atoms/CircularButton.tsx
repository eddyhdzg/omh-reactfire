import React from "react";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

interface ICircularButton {
  icon: "add" | "subtract";
  onClick: () => void;
}

export default function CircularButton(props: ICircularButton) {
  const { icon, onClick } = props;
  return (
    <IconButton aria-label={icon} onClick={onClick} color="default">
      {icon === "add" ? <AddIcon /> : <RemoveIcon />}
    </IconButton>
  );
}
