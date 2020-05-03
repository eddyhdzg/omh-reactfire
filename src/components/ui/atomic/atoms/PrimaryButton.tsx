import React from "react";
import { Button } from "@material-ui/core";

interface IPrimaryButton {
  text: string;
  onClick?: () => void;
  disabled: boolean;
  type?: "button" | "submit" | "reset";
}

export default function PrimaryButton(props: IPrimaryButton) {
  const { disabled, text, onClick, type } = props;

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </Button>
  );
}

PrimaryButton.defaultProps = {
  type: "button",
};
