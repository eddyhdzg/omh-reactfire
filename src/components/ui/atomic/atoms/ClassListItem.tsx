import React from "react";
import {
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  InputBase,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

interface IClassListItem {
  name: string;
  id: string;
  index: number;
  removeClass: (id: string) => Promise<any>;
  updateClass: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ClassListItem(props: IClassListItem) {
  const { id, index, name, removeClass, updateClass } = props;

  return (
    <ListItem>
      <span style={{ marginRight: "8px" }}>{`${index}-`}</span>
      <InputBase
        id={id}
        value={name}
        inputProps={{ "aria-label": "naked" }}
        onChange={updateClass}
      />

      <ListItemSecondaryAction onClick={() => removeClass(id)}>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
