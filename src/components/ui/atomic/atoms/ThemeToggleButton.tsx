import React from "react";
import { useStore } from "../../../store";
import IconButton from "@material-ui/core/IconButton";
import BrightnessIcon from "@material-ui/icons/Brightness4";

export default function ThemeToggleButton() {
  const { toggleTheme } = useStore();

  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={() => toggleTheme()}
    >
      <BrightnessIcon />
    </IconButton>
  );
}
