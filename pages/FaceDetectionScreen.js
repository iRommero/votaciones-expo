import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';

const FaceDetectionScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const { status } = await RNCamera.requestPermissions();
        setHasPermission(status === 'granted');
      } catch (error) {
        console.error("Camera permission error:", error);
        Alert.alert("Error", "No se pudo obtener el permiso de la cámara.");
      }
    };

    requestCameraPermission();
  }, []);

  const handleFacesDetected = ({ faces }) => {
    if (faces.length === 0) {
      Alert.alert(
        'No Face Detected',
        'No se detectó ningún rostro. Serás redirigido a la pantalla de inicio.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    }
  };

  if (hasPermission === null) {
    return <View style={styles.centered}><Text>Solicitando permisos de cámara...</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.centered}><Text>No se tienen permisos para usar la cámara</Text></View>;
  }

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.front}
        onFacesDetected={handleFacesDetected}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.fast}
      >
        <View style={styles.buttonContainer}>
          <Button title="Cerrar Sesión" onPress={() => navigation.navigate('Login')} />
        </View>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20
  }
});

export default FaceDetectionScreen;
