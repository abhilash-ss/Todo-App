import React from 'react';
import { themes } from '../constants/themes';

let setTheme: React.Dispatch<React.SetStateAction<typeof themes.light>> = () => undefined

export const ThemeContext = React.createContext({
    theme: themes.light,
    setTheme: setTheme
});
