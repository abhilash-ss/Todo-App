import React, { useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Home from './components/Home/Home';
import { themes } from './src/constants/themes';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { setTheme } = props
  // const [theme] = useContext(ThemeContext);


  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
      <DrawerItem
        label="About"
        onPress={() => props.navigation.toggleDrawer()}
      />
      {Object.keys(themes).map((item,index) => <DrawerItem
        key={index.toString()}
        label={"set theme" + item}
        onPress={() => {
          setTheme(themes[item])
        }}
      />)}

    </DrawerContentScrollView>
  );
}

export const ThemeContext = React.createContext([]);

export default function App() {
  const [theme, setTheme] = useState(themes.light)
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => CustomDrawerContent({ ...props, setTheme })}>
          <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
