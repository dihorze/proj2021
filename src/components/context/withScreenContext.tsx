import React, { useState, useEffect } from 'react';

const ScreenContext = React.createContext([window.innerWidth, window.innerHeight]);

export const ScreenContextProvider: React.FC = props => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return <ScreenContext.Provider value={size}>{props.children}</ScreenContext.Provider>;
};

interface ScreenContextProps {
  screenSize: Array<number>;
}

export const withScreenContext = <P extends object>(
  Component: React.ComponentType<Pick<P, Exclude<keyof P, keyof ScreenContextProps>>>
) => (props: Pick<P, Exclude<keyof P, keyof ScreenContextProps>>) => {
  return (
    <ScreenContext.Consumer>
      {size => <Component screenSize={size} {...props} />}
    </ScreenContext.Consumer>
  );
};
