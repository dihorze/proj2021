import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Turf from './Turf';
import { Point } from '../../../model/positioning';

const useStyles = makeStyles({

});

const Ground: React.FC = () => {
  const classes = useStyles({});

  const point = new Point(300, 300);

  return (
    // <Turf locs={point}/>
    <div></div>
  );
};

export default Ground;
