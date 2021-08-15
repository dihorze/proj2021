import React from 'react';
import "./GlowingBorder.css";

interface GlowingBorderProps {
  onClick?: (e: React.MouseEvent) => void;
  style?: any;
}

export const GlowingBorder: React.FC<GlowingBorderProps> = ({
  children,
  style
}) => {
  // const classes = useStyles({});

  return (
    <div className="glow-ctn" style={style}>
        {children}
    </div>
  );
};