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
import Icon from 'react-native-vector-icons/Ionicons';

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
  const [images, setImages] = useState(animal?.photos || []);
  const [errors, setErrors] = useState({
    name: '',
    breed: '',
    description: '',
    images: '',
  });
  const [loading, setLoading] = useState(false);

  const handleImagePick = async () => {
    try {
      setLoading(true);
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 0,
      });

      if (result.assets && result.assets.length > 0) {
        setImages(prevImages => [
          ...prevImages,
          ...result.assets.map(item => item.uri),
        ]);
      }
    } catch (error) {
      console.error('Error selecting images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageRemove = uri => {
    setImages(prevImages => prevImages.filter(image => image !== uri));
  };

  const handleSave = () => {
    let valid = true;
    const newErrors = {name: '', breed: '', description: '', images: ''};

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
    if (images.length === 0) {
      newErrors.images = 'At least one image is required';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      dispatch(
        editAnimal(animalId, {name, breed, description, photos: images}),
      );
      navigation.goBack();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Edit Animal</Text>

        <Text style={styles.label}>Name</Text>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            placeholder="Enter animal name"
            value={name}
            onChangeText={setName}
          />
          {errors.name ? (
            <Text style={styles.errorText}>{errors.name}</Text>
          ) : null}
        </View>

        <Text style={styles.label}>Breed</Text>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            placeholder="Enter animal breed"
            value={breed}
            onChangeText={setBreed}
          />
          {errors.breed ? (
            <Text style={styles.errorText}>{errors.breed}</Text>
          ) : null}
        </View>

        <Text style={styles.label}>Description</Text>
        <View style={styles.inputBottom}>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          {errors.description ? (
            <Text style={styles.errorText}>{errors.description}</Text>
          ) : null}
        </View>

        <Text style={styles.label}>Images</Text>
        <ScrollView horizontal style={styles.imageScroll}>
          {images.length > 0 ? (
            images.map((uri, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image source={{uri}} style={styles.animalImage} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleImageRemove(uri)}>
                  <Icon name="close-circle" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.placeholderText}>No images selected</Text>
          )}
        </ScrollView>

        <View style={styles.inputBottom}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleImagePick}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.uploadButtonText}>
                {images.length > 0 ? 'Add More Photos' : 'Upload Photos'}
              </Text>
            )}
          </TouchableOpacity>
          {errors.images ? (
            <Text style={styles.errorText}>{errors.images}</Text>
          ) : null}
        </View>

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
    fontSize: 16,
    backgroundColor: '#f5f5f5',
  },
  inputBottom: {marginBottom: 16},
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageScroll: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  imageContainer: {
    marginRight: 8,
    position: 'relative',
    marginTop: 10,
  },
  animalImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#f44336',
    borderRadius: 12,
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
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
  },
});

export default EditAnimalScreen;
