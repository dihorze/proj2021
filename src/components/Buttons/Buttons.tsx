import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { StyleRules } from '@material-ui/core';
import "./Buttons.css";
import { GlowingBorder } from '../GlowingBorders/GlowingBorder';

const useStyles = makeStyles({
  btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 32,
    maxWidth: 200,
    backgroundColor: "rgba(255, 128, 0, 0.5)",
    "-webkit-user-select": "none",  
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
    "&:hover": {
      "& $text": {
        fontSize: 18,
      }
    },
    "&:active": {
      "& $text": {
        transform: "translateY(2px)"
      }
    }
  },
  text: {
    fontSize: 16,
    color: "black",
    textShadow: "1.5px 1.5px 2px dimgray"
  }
});

interface ButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  textStyle?: any;
  btnStyle?: any;
}

export const Button1: React.FC<ButtonProps> = ({
  children,
  onClick,
  btnStyle,
  textStyle
}) => {
  // const classes = useStyles({});

  return (
    <div className="btn" style={btnStyle} onClick={onClick}>
      <div className="text" style={textStyle}>
        {children}
      </div>
    </div>
  );
};

export const Button2: React.FC<ButtonProps> = ({
  children,
  onClick,
  btnStyle,
  textStyle
}) => {
  const classes = useStyles({});

  return (
    <div className={classes.btn} style={btnStyle} onClick={onClick}>
      <div className={classes.text} style={textStyle}>
        {children}
      </div>
    </div>
  );
};
