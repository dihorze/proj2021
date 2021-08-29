import { makeStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";

interface StatusBarProps {

}

const useStyles = makeStyles({

});

const StatusBar: React.FC<StatusBarProps> = ({

}) => {
  const classes = useStyles({});


  return (
    <div>

    </div>
  );
};

const mapStateToProps = ({ battle }) => {
  return {

  };
};


export default connect(mapStateToProps)(StatusBar);
