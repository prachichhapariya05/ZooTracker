import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import Navigation from './src/navigation/Navigation';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (SplashScreen) {
        SplashScreen.hide();
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
