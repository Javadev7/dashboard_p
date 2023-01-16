import React, { createContext, useContext, useState } from 'react';

//  Se crea el contexto global StateContext
const StateContext = createContext();
//  Se crea el estado inicial para isClicked
const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};
//! Se crean los contextos que seran proveidos a los hijos
export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Dark');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  /* It takes the value of the clicked button and sets the currentMode state to that value
 * @param e - The event object.
  Actualizamos el tema */
  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  /* It takes a color as an argument, sets the current color to that color, and then saves that color to
   * local storage
   * @param color - The color mode that we want to set. Se va a establecer el color */
  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  /* When the user clicks on a button, set the state of the clicked button to true.
   * @param clicked - the name of the button that was clicked */
  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    /* Por lo general estamos llamando solo a las actualizaciones de los estados "Set" */
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
