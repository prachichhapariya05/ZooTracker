import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store';
import Navigation from './src/navigation/Navigation';
import SplashScreen from 'react-native-splash-screen';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (SplashScreen) {
        SplashScreen.hide();
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}
