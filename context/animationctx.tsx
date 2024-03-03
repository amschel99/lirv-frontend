import React, {
  JSX,
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type animationctxtype = {
  typeofanimation: string;
  animationmessage: string;
  renderanimation: boolean;
  showAnimation: (animationtype: string, animationmessage: string) => void;
  hideAnimation: () => void;
};

const animationcontext = createContext<animationctxtype>(
  {} as animationctxtype
);

interface fabproviderprops {
  children: ReactNode;
}

export const AnimationProvider = ({
  children,
}: fabproviderprops): JSX.Element => {
  const [renderanimation, setrenderanimation] = useState<boolean>(false);
  const [typeofanimation, settypeofanimation] = useState<string>("");
  const [animationmessage, setanimationmessage] = useState<string>("");

  const showAnimation = (
    typeofanimation: string,
    animationmessage: string
  ): void => {
    setrenderanimation(true);
    settypeofanimation(typeofanimation);
    setanimationmessage(animationmessage);
  };

  const hideAnimation = (): void => {
    setrenderanimation(false);
    settypeofanimation("");
  };

  return (
    <animationcontext.Provider
      value={{
        renderanimation,
        typeofanimation,
        animationmessage,
        showAnimation,
        hideAnimation,
      }}
    >
      {children}
    </animationcontext.Provider>
  );
};

export const useAnimation = (): animationctxtype =>
  useContext<animationctxtype>(animationcontext);
