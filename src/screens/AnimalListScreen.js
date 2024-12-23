import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeAnimal} from '../store/actions/animalActions';

function AnimalListScreen({navigation}) {
  const animals = useSelector(state => state.animal.animals);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredAnimals = animals.filter(
    animal =>
      animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.breed.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleRemove = id => {
    dispatch(removeAnimal(id));
  };

  const renderAnimalCard = ({item}) => (
    <View style={styles.card}>
      <View style={styles.row}>
        {item.photo && (
          <Image source={{uri: item.photo}} style={styles.animalImage} />
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.animalName}>{item.name}</Text>
          <Text style={styles.animalDetails}>Breed: {item.breed}</Text>
          <Text style={styles.animalDetails}>
            Description: {item.description}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() =>
            navigation.navigate('EditAnimal', {animalId: item.id})
          }>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.removeButton]}
          onPress={() => handleRemove(item.id)}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or breed"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredAnimals}
        keyExtractor={item => item.id.toString()}
        renderItem={renderAnimalCard}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No animals found. Add some!</Text>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddAnimal')}>
        <Text style={styles.addButtonText}>+ Add Animal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  animalImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
  },
  animalName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  animalDetails: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  editButton: {
    backgroundColor: '#4caf50',
  },
  removeButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#1E5631',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#888',
    marginTop: 32,
  },
});

export default AnimalListScreen;
