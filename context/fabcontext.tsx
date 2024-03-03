import React, {
  JSX,
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type fabctxtype = {
  rendersFabMenu: boolean;
  showFabMenu: () => void;
  hideFabMenu: () => void;
};

const fabcontext = createContext<fabctxtype>({} as fabctxtype);

interface fabproviderprops {
  children: ReactNode;
}

export const FabProvider = ({ children }: fabproviderprops): JSX.Element => {
  const [rendersFabMenu, setrendersFabMenu] = useState<boolean>(false);

  const showFabMenu = (): void => {
    setrendersFabMenu(true);
  };

  const hideFabMenu = (): void => {
    setrendersFabMenu(false);
  };

  return (
    <fabcontext.Provider value={{ rendersFabMenu, showFabMenu, hideFabMenu }}>
      {children}
    </fabcontext.Provider>
  );
};

export const useFab = (): fabctxtype => useContext<fabctxtype>(fabcontext);
