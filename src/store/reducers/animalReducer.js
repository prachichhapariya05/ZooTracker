// import {ADD_ANIMAL, REMOVE_ANIMAL, EDIT_ANIMAL} from '../actions/animalActions';

// const initialState = {
//   animals: [],
// };

// const animalReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_ANIMAL:
//       return {...state, animals: [...state.animals, action.payload]};
//     case REMOVE_ANIMAL:
//       return {
//         ...state,
//         animals: state.animals.filter(animal => animal.id !== action.payload),
//       };
//     case EDIT_ANIMAL:
//       return {
//         ...state,
//         animals: state.animals.map(animal =>
//           animal.id === action.payload.id
//             ? {...animal, ...action.payload.updatedAnimal}
//             : animal,
//         ),
//       };
//     default:
//       return state;
//   }
// };

// export default animalReducer;

import {ADD_ANIMAL, REMOVE_ANIMAL, EDIT_ANIMAL} from '../actions/animalActions';

const initialState = {
  animals: [],
};

const animalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ANIMAL:
      return {
        ...state,
        animals: [...state.animals, action.payload],
      };
    case REMOVE_ANIMAL:
      return {
        ...state,
        animals: state.animals.filter(animal => animal.id !== action.payload),
      };
    case EDIT_ANIMAL:
      return {
        ...state,
        animals: state.animals.map(animal =>
          animal.id === action.payload.id
            ? {...animal, ...action.payload.updatedAnimal}
            : animal,
        ),
      };
    default:
      return state;
  }
};

export default animalReducer;
