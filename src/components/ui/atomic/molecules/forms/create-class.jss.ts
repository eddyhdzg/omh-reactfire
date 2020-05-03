import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    div: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  })
);

export default useStyles;
