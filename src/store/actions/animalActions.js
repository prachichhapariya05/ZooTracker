export const ADD_ANIMAL = 'ADD_ANIMAL';
export const REMOVE_ANIMAL = 'REMOVE_ANIMAL';
export const EDIT_ANIMAL = 'EDIT_ANIMAL';

export const addAnimal = animal => ({
  type: ADD_ANIMAL,
  payload: animal,
});

export const removeAnimal = id => ({
  type: REMOVE_ANIMAL,
  payload: id,
});

export const editAnimal = (id, updatedAnimal) => ({
  type: EDIT_ANIMAL,
  payload: {id, updatedAnimal},
});
