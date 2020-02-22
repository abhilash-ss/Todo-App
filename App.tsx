import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Home from './src/Containers/Home/Home';
import ConfigTask from './src/Containers/ConfigTask/ConfigTask';
import { themes, Ithemes } from './src/constants/themes';
import { ThemeContext } from './src/utils/themeContext';

const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

const usedTheme: Array<keyof Ithemes> = ['light', 'dark'];

function CustomDrawerContent(props: any) {
  const { setTheme } = props;
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
      {usedTheme.map((item, index) => (
        <DrawerItem
          key={index.toString()}
          label={'set theme' + item}
          onPress={() => {
            setTheme(themes[item]);
          }}
        />
      ))}
    </DrawerContentScrollView>
  );
}

export default function App() {
  const [theme, setTheme] = useState(themes.light);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={props => CustomDrawerContent({ ...props, setTheme })}
        >
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="ConfigTask" component={ConfigTask} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
