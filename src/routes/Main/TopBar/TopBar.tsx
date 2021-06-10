import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button1, Button2 } from '../../../components/Buttons/Buttons';

const useStyles = makeStyles({
  topbar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "rgba(0, 255, 255, 0.02)",
    height: 36
  }, 
  status: {
    width: 150,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    border: "0px black solid"
  },
  icon: {
    borderRadius: 14,
    border: "1.5px darkcyan solid",
    width: 28,
    height: 28,
    padding: 0,
    marginRight: 5,
    marginLeft: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "darkcyan"
  },
  moneyicon: {
    borderRadius: 14,
    border: "1.5px orange solid",
    width: 28,
    height: 28,
    padding: 0,
    marginRight: 5,
    marginLeft: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  moneytext: {
    color: "orange"
  },
  btn: {
    width: "10%"
  }
});

const TopBar: React.FC = () => {
  const classes = useStyles({});

  return (
    <div className={classes.topbar}>
      <div className={classes.status}>
        <div className={classes.icon}>
          <img src="https://user-images.githubusercontent.com/42278106/121330873-f890ce80-c948-11eb-9816-edae6a744eb2.png" alt="sanity" style={{ height: 24, width: 24 }}/>
        </div>
        <div className={classes.text}>100</div>
        <div className={classes.moneyicon}>
          <img src="https://user-images.githubusercontent.com/42278106/121336011-b322d000-c94d-11eb-8d5c-2a30df99f9a9.png" alt="money" style={{ height: 16, width: 16 }}/>
        </div>
        <div className={classes.moneytext}>99</div>
      </div>
      <div className={classes.btn}>
        <Button1>Play</Button1>
      </div>
      <div className={classes.btn}>
        <Button2>Conpendium</Button2>
      </div>
    </div>
  );
};

export default TopBar;
