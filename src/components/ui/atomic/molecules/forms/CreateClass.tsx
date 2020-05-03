import React, { useState } from "react";
import { Input, PrimaryButton } from "../../atoms";
import useStyles from "./create-class.jss";

interface ICreateClass {
  handleSubmitform: (commonName: string) => Promise<any>;
}

export default function CreateClass(props: ICreateClass) {
  const { handleSubmitform } = props;
  const classes = useStyles();

  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    handleSubmitform(text).then(() => {
      setText("");
      setDisabled(false);
    });
  };

  return (
    <form onSubmit={onSave}>
      <div className={classes.div}>
        <Input
          id="class"
          label="Materia"
          value={text}
          onChange={handleChange}
        />

        <PrimaryButton
          text="Agregar Materia"
          disabled={disabled || text.length < 3}
          type="submit"
        />
      </div>
    </form>
  );
}
