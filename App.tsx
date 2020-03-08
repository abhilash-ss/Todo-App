import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Containers/Home/Home';
import ConfigTask from './src/Containers/ConfigTask/ConfigTask';
import Sidebar from './src/Containers/Sidebar/Sidebar';
import { themes, Ithemes } from './src/constants/themes';
import { ThemeContext } from './src/utils/themeContext';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// const usedTheme: Array<keyof Ithemes> = ['light', 'dark'];

function CustomDrawerContent(props: any) {
  // const { setTheme } = props;
  return (
    <Sidebar {...props} />
    // <DrawerContentScrollView {...props}>
    //   <DrawerItemList {...props} />
    //   <DrawerItem
    //     label="Close drawer"
    //     onPress={() => props.navigation.closeDrawer()}
    //   />
    //   <DrawerItem
    //     label="Toggle drawer"
    //     onPress={() => props.navigation.toggleDrawer()}
    //   />
    //   <DrawerItem
    //     label="About"
    //     onPress={() => props.navigation.toggleDrawer()}
    //   />
    //   {/* {usedTheme.map((item, index) => (
    //     <DrawerItem
    //       key={index.toString()}
    //       label={'set theme' + item}
    //       onPress={() => {
    //         setTheme(themes[item]);
    //       }}
    //     />
    //   ))} */}
    // </DrawerContentScrollView>
  );
}

function root() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ConfigTask" component={ConfigTask} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [theme, setTheme] = useState(themes.light);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <Sidebar {...props} />}>
          <Drawer.Screen name="Home" component={root} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
