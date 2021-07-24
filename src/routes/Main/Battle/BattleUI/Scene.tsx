import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  img: {
    width: "100%",
    zIndex: -1
  },
});

export const Scene: React.FC = () => {
  const classes = useStyles({});

  return (
    <img
      src="./assets/office.png"
      alt="background"
      className={classes.img}
      draggable={false}
    />
  );
};
