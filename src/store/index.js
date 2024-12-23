// import {createStore, combineReducers} from 'redux';
// import animalReducer from './reducers/animalReducer';

// const rootReducer = combineReducers({
//   animal: animalReducer,
// });

// const store = createStore(rootReducer);

// export default store;

import {createStore} from 'redux';
import {combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import animalReducer from './reducers/animalReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['animal'],
};

const rootReducer = combineReducers({
  animal: animalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {store, persistor};
