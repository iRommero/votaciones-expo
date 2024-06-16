import React, { useState, useRef } from 'react';
import { View, Button, Text, StyleSheet, Image, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { Card } from 'react-native-paper';

function ScanIDScreen({ navigation }) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [step, setStep] = useState('front'); // Track whether taking front or back photo
  const [photos, setPhotos] = useState({ front: null, back: null });
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();

  if (!permission) {
    return <View style={styles.centeredContainer}><Text>Cargando permisos...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.centeredContainer}>
        <Text>Necesitamos tu permiso para mostrar la cámara</Text>
        <Button onPress={requestPermission} title="Conceder permiso" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (step === 'front') {
        setPhotos({ ...photos, front: photo });
        setStep('back');
      } else {
        setPhotos({ ...photos, back: photo });
      }
    }
  };

  const verifyPhotos = () => {
    if (photos.front && photos.back) {
      navigation.navigate('Votar', { photos });
    } else {
      Alert.alert('Error', 'Por favor, asegúrese de tomar ambas fotos.');
    }
  };

  return (
    <View style={styles.container}>
      {isFocused && !photos.back ? (
        <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.back}>
          {photos.front && (
            <View style={styles.previewContainer}>
              <Image source={{ uri: photos.front.uri }} style={styles.preview} />
              <Text style={styles.previewText}>Frontal capturada</Text>
            </View>
          )}
        </Camera>
      ) : (
        <View style={styles.photosContainer}>
          <Card style={styles.card}>
            {photos.front && (
              <View>
                <Image source={{ uri: photos.front.uri }} style={styles.photo} />
                <Text style={styles.cardText}>Foto Frontal</Text>
              </View>
            )}
          </Card>
          <Card style={styles.card}>
            {photos.back && (
              <View>
                <Image source={{ uri: photos.back.uri }} style={styles.photo} />
                <Text style={styles.cardText}>Foto Trasera</Text>
              </View>
            )}
          </Card>
        </View>
      )}
      <View style={styles.buttonContainer}>
        {!photos.back ? (
          <Button title={step === 'front' ? "Tomar Foto Frontal" : "Tomar Foto Trasera"} onPress={takePicture} />
        ) : (
          <Button title="Verificar Fotos" onPress={verifyPhotos} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  camera: {
    flex: 4,
    width: '100%',
    margin: 10,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  previewText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  photosContainer: {
    flex: 4,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    width: '80%',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  cardText: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ScanIDScreen;
