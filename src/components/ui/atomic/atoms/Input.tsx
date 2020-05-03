import React from "react";
import { TextField } from "@material-ui/core";

interface iInput {
  id: string;
  label: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: iInput) {
  const { id, label, value, onChange } = props;

  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
    />
  );
}
