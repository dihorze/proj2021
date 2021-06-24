import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  img: {
    width: "100%",
    height: "100%",
    zIndex: -1
  },
});

export const Scene: React.FC = () => {
  const classes = useStyles({});

  return (
    <img
      src="https://user-images.githubusercontent.com/42278106/122672952-cf055c00-d200-11eb-9a72-c0f2d229e891.png"
      alt="background"
      className={classes.img}
      draggable={false}
    />
  );
};
