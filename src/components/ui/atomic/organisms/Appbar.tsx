import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useStyles from "./appbar.jss";
import ThemeToggleButton from "../atoms/ThemeToggleButton";

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <span role="img" aria-label="fire">
              🔥
            </span>
            ReactFire Workshop
          </Typography>
          <ThemeToggleButton />
        </Toolbar>
      </AppBar>
    </div>
  );
}
