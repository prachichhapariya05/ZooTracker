import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AnimalListScreen from '../screens/AnimalListScreen';
import AddAnimalScreen from '../screens/AddAnimalScreen';
import EditAnimalScreen from '../screens/EditAnimalScreen';
import SplashScreenComponent from '../screens/SplashScreen';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreenComponent}
          options={{headerShown: false}}
        />
        <Stack.Screen name="AnimalList" component={AnimalListScreen} />
        <Stack.Screen name="AddAnimal" component={AddAnimalScreen} />
        <Stack.Screen name="EditAnimal" component={EditAnimalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
