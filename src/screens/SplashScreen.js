import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const SplashScreenComponent = ({navigation}) => {
  const bgOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(bgOpacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          navigation.replace('AnimalList');
        }, 1000);
      });
    });
  }, [bgOpacity, textOpacity, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assest/zoo-bg.png')}
        style={[styles.backgroundImage, {opacity: bgOpacity}]}
      />
      <Animated.Text style={[styles.text, {opacity: textOpacity}]}>
        ZOO TRACKER
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2e8b57',
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1E5631',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
});

export default SplashScreenComponent;
