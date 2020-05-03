import React from "react";
import { Container, Grid, Paper } from "@material-ui/core";
import AuthButton from "../../../firebase/Auth";
import RealtimeDatabase from "../../../firebase/RealtimeDatabase";
import Storage from "../../../firebase/Storage";
import { Card } from "../atoms";
import useStyles from "./main.jss";

const Main: React.FC = () => {
  const classes = useStyles();
  return (
    <main>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Card title="Authentication">
                <AuthButton />
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Card title="RealtimeDatabase">
                <RealtimeDatabase />
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Card title="Storage">
                <Storage />
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default Main;
