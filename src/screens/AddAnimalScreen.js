import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {addAnimal} from '../store/actions/animalActions';

function AddAnimalScreen({navigation}) {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    breed: '',
    description: '',
    photo: '',
  });

  const dispatch = useDispatch();

  const handleAdd = () => {
    let valid = true;
    const newErrors = {name: '', breed: '', description: '', photo: ''};

    // Validate fields
    if (!name) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!breed) {
      newErrors.breed = 'Breed is required';
      valid = false;
    }
    if (!description) {
      newErrors.description = 'Description is required';
      valid = false;
    }

    if (photo === null) {
      newErrors.photo = 'Animal Image is required';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      const newAnimal = {
        id: Math.random().toString(),
        name,
        breed,
        description,
        photo,
      };
      dispatch(addAnimal(newAnimal));
      navigation.goBack();
    }
  };

  const handleImagePick = async () => {
    try {
      setLoading(true);
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.assets && result.assets.length > 0) {
        setPhoto(result.assets[0].uri);
      } else {
        setPhoto(null); // Reset photo if no image is selected
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    // Clear the error message when the user starts typing
    setErrors(prev => ({...prev, [field]: ''}));
    if (field === 'name') setName(value);
    if (field === 'breed') setBreed(value);
    if (field === 'description') setDescription(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Add New Animal</Text>
        <View style={styles.inputBottom}>
          <TextInput
            style={[styles.input, errors.name ? styles.inputError : null]}
            placeholder="Name"
            value={name}
            onChangeText={text => handleInputChange('name', text)}
          />
          {errors.name ? (
            <Text style={styles.errorText}>{errors.name}</Text>
          ) : null}
        </View>
        <View style={styles.inputBottom}>
          <TextInput
            style={[styles.input, errors.breed ? styles.inputError : null]}
            placeholder="Breed"
            value={breed}
            onChangeText={text => handleInputChange('breed', text)}
          />
          {errors.breed ? (
            <Text style={styles.errorText}>{errors.breed}</Text>
          ) : null}
        </View>
        <View style={styles.inputBottom}>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              errors.description ? styles.inputError : null,
            ]}
            placeholder="Description"
            value={description}
            onChangeText={text => handleInputChange('description', text)}
            multiline
          />
          {errors.description ? (
            <Text style={styles.errorText}>{errors.description}</Text>
          ) : null}
        </View>
        <View style={styles.inputBottom}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleImagePick}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.uploadButtonText}>
                {photo ? 'Change Photo' : 'Upload Photo'}
              </Text>
            )}
          </TouchableOpacity>
          {errors.photo ? (
            <Text style={styles.errorText}>{errors.photo}</Text>
          ) : null}
        </View>
        {photo && <Image source={{uri: photo}} style={styles.imagePreview} />}
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add Animal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
  },
  inputBottom: {
    marginBottom: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  addButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
  },
});

export default AddAnimalScreen;
