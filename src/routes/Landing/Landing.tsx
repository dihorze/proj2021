import React from "react";
import { NavLink } from "react-router-dom";

const landing: React.FC<{}> = (props) => {
  return (
    <React.Fragment>
      <div>This is the landing page.</div>
      <div>
        <NavLink to="/main">to Main page</NavLink>
      </div>
    </React.Fragment>
  );
};

export default landing;
