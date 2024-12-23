import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {editAnimal} from '../store/actions/animalActions';
import {selectAnimalById} from '../store/selectors';

const EditAnimalScreen = ({route, navigation}) => {
  const {animalId} = route.params;
  const dispatch = useDispatch();

  const animal = useSelector(state => selectAnimalById(state, animalId));

  if (!animal) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFoundText}>Animal Not Found</Text>
      </View>
    );
  }

  const [name, setName] = useState(animal?.name || '');
  const [breed, setBreed] = useState(animal?.breed || '');
  const [description, setDescription] = useState(animal?.description || '');
  const [image, setImage] = useState(animal?.photo || '');
  const [loading, setLoading] = useState(false);

  const handleImagePick = async () => {
    try {
      setLoading(true);
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    dispatch(editAnimal(animalId, {name, breed, description, photo: image}));
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Edit Animal</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter animal name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Breed</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter animal breed"
          value={breed}
          onChangeText={setBreed}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Image</Text>
        {image ? (
          <Image source={{uri: image}} style={styles.animalImage} />
        ) : (
          <Text style={styles.placeholderText}>No image selected</Text>
        )}

        <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.uploadButtonText}>
              {image ? 'Change Photo' : 'Upload Photo'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    flexGrow: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  animalImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  placeholderText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notFoundText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f44336',
  },
  uploadButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditAnimalScreen;