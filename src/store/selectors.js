import {createSelector} from 'reselect';

const selectAnimals = state => state.animal.animals;

export const selectAnimalById = createSelector(
  [selectAnimals, (state, animalId) => animalId],
  (animals, animalId) => animals?.find(animal => animal.id === animalId),
);
