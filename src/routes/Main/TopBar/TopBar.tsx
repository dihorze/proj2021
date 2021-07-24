import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Button1, Button2 } from "../../../components/Buttons/Buttons";
import { connect } from "react-redux";
import { toggleDeckOfCards } from "../../../store/actions/setting";

const useStyles = makeStyles({
  topbar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    background:
      "linear-gradient(to left, rgba(0, 128, 128, 0.2), rgba(0, 128, 128, 0) 30%)",
    height: 36,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 300,
  },
  status: {
    width: 200,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 36,
    height: 36,
    padding: 0,
    marginRight: 0,
    marginLeft: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    color: "darkcyan",
  },
  moneytext: {
    fontWeight: "bold",
    color: "orange",
  },
  btn: {
    width: "10%",
  },

});

interface TopBarProps {
  toggleDeckOfCards: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ toggleDeckOfCards }) => {
  const classes = useStyles({});

  return (
    <>
    <div className={classes.topbar} onContextMenu={e => e.preventDefault()}>
      <div className={classes.status}>
        <div className={classes.icon}>
          <img
            src="./assets/sanity.png"
            alt="sanity"
            style={{ height: 28, width: 28 }}
            draggable={false}
          />
        </div>
        <div className={classes.text}>100</div>
        <div className={classes.icon}>
          <img
            src="./assets/money.png"
            alt="money"
            style={{ height: 24, width: 24 }}
            draggable={false}
          />
        </div>
        <div className={classes.moneytext}>99</div>
      </div>
    </div>
    
    </>
  );
};

export default connect(null, { toggleDeckOfCards })(TopBar);
