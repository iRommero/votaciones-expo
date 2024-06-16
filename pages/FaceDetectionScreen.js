import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const FaceDetectionScreen = ({ navigation }) => {
  const isFocused = useIsFocused();

  const handleFacesDetected = ({ faces }) => {
    if (faces == undefined || faces.length === 0) {
      alert('No se detectó ninguna cara');
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      {isFocused && <Camera
        style={styles.camera}
        type={Camera.Constants.Type.front}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
      />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end', // Alinear la cámara hacia el lado derecho
    paddingTop: 0, // Espacio superior para que no esté justo en el border superior
  },
  camera: {
    width: 100, // Ancho pequeño para la cámara
    height: 150, // Altura pequeña para la cámara
  },
});

export default FaceDetectionScreen;
