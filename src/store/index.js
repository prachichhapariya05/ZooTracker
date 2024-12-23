import {createStore} from 'redux';
import {combineReducers} from 'redux';
import animalReducer from './reducers/animalReducer';

const rootReducer = combineReducers({
  animal: animalReducer,
});

const store = createStore(rootReducer);

export default store;
