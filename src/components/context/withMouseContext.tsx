import React from 'react';
import { Point } from '../../model/positioning';

const MouseContext = React.createContext<Point>(Point.at(0, 0));

export const MouseContextProvider: React.FC = props => {
  const [mouse, setMouse] = React.useState<Point>(Point.at(0, 0));

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse(Point.at(e.clientX, e.clientY));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <MouseContext.Provider value={mouse}>{props.children}</MouseContext.Provider>;
};

interface MouseContextProps {
  mousePos: Point;
}

export const withMouseContext = <P extends object>(
  Component: React.ComponentType<Pick<P, Exclude<keyof P, keyof MouseContextProps>>>
) => (props: Pick<P, Exclude<keyof P, keyof MouseContextProps>>) => {
  return (
    <MouseContext.Consumer>
      {mousePos => <Component mousePos={mousePos} {...props} />}
    </MouseContext.Consumer>
  );
};
