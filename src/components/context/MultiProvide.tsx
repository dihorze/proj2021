import React from 'react';

interface MultiProviderProps {
  providers: React.ComponentType[];
}

const MultiProvider: React.FC<MultiProviderProps> = props => {
  let compositeComponent = <MemoizedChild>{props.children}</MemoizedChild>;

  props.providers.forEach(Provider => {
    compositeComponent = <Provider>{compositeComponent}</Provider>;
  });

  return <>{compositeComponent}</>;
};

/**
 * Memoized internal child to prevent re-render on any of the context change.
 * Re-renders based on context should only be triggered on explicit context
 * consumers.
 *
 * If the `any` is able to be replaced with something more useful, go ahead.
 */
const MemoizedChild = React.memo((props: any) => props.children, () => true);

export default MultiProvider;
