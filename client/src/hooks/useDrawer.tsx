import React, { useState } from 'react';

export interface DrawerContext {
  isOpen: boolean;
  setDrawer: (isOpen: boolean) => void;
}

export const DRAWER_DEFAULT = {
  isOpen: false,
  setDrawer: () => {}
};

export const drawerContext = React.createContext<DrawerContext>(DRAWER_DEFAULT);

export const useDrawer = (): DrawerContext => {
  const [isOpen, setDrawerState] = useState(false);

  const setDrawer = React.useCallback((drawerState: boolean): void => {
    setDrawerState(drawerState);
  }, []);

  return {
    isOpen,
    setDrawer
  };
};
