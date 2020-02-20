import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home/Home';

export default function App() {
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  );
}
