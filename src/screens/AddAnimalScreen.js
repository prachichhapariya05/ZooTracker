import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {addAnimal} from '../store/actions/animalActions';
import Icon from 'react-native-vector-icons/MaterialIcons';

function AddAnimalScreen({navigation}) {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    breed: '',
    description: '',
    photos: '',
  });

  const dispatch = useDispatch();

  const handleAdd = () => {
    let valid = true;
    const newErrors = {name: '', breed: '', description: '', photos: ''};

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

    if (photos.length === 0) {
      newErrors.photos = 'At least one image is required';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      const newAnimal = {
        id: Math.random().toString(),
        name,
        breed,
        description,
        photos,
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
        selectionLimit: 0,
        quality: 0.8,
      });

      if (result.assets && result.assets.length > 0) {
        setPhotos([...photos, ...result.assets.map(asset => asset.uri)]);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setErrors(prev => ({...prev, [field]: ''}));
    if (field === 'name') setName(value);
    if (field === 'breed') setBreed(value);
    if (field === 'description') setDescription(value);
  };

  const removeImage = index => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
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
                {photos ? 'Add Photo' : 'Upload Photo'}
              </Text>
            )}
          </TouchableOpacity>
          {errors.photos ? (
            <Text style={styles.errorText}>{errors.photos}</Text>
          ) : null}
        </View>
        <ScrollView horizontal>
          {photos.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{uri}} style={styles.imagePreview} />
              <TouchableWithoutFeedback onPress={() => removeImage(index)}>
                <View style={styles.removeIcon}>
                  <Icon name="cancel" size={24} color="white" />
                </View>
              </TouchableWithoutFeedback>
            </View>
          ))}
        </ScrollView>

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
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
    marginTop: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  removeIcon: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'red',
    borderRadius: 12,
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
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 4,
    resizeMode: 'cover',
  },
});

export default AddAnimalScreen;
