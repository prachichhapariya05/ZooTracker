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
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1E5631',
          },
          headerTintColor: '#f5f5dc',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
        }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreenComponent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AnimalList"
          component={AnimalListScreen}
          options={{
            title: 'Animal List',
          }}
        />
        <Stack.Screen
          name="AddAnimal"
          component={AddAnimalScreen}
          options={{
            title: 'Add Animal',
          }}
        />
        <Stack.Screen
          name="EditAnimal"
          component={EditAnimalScreen}
          options={{
            title: 'Edit Animal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
