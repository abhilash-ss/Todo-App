import React from 'react';
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

function CustomDrawerContent(props) {
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
    </DrawerContentScrollView>
  );
}

export const ThemeContext = React.createContext(themes.light);

export default function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => CustomDrawerContent(props)}>
          <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
