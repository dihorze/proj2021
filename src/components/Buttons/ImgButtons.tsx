import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { StyleRules } from '@material-ui/core';

const useStyles = makeStyles({
  btn: {

  },
  text: {

  }
});

interface ImgButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  src: string;
  alt?: string;
  textStyle?: StyleRules;
  btnStyle?: StyleRules;
}


export const ImgButton1: React.FC<ImgButtonProps> = ({
  onClick,
  src,
  alt,
  textStyle,
  btnStyle
}) => {
  const classes = useStyles({});

  return (
    <div className={classes.btn} style={btnStyle}>
      <div className={classes.text} style={textStyle}>

      </div>
    </div>
  );
};

