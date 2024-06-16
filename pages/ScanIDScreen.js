import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';

function ScanIDScreen({ navigation }) {
  const [facing, setFacing] = useState(Camera.Constants.Type.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
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

  const toggleFacing = () => {
    setFacing(facing === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
  };

  return (
    <View style={styles.container}>
      { isFocused && <Camera style={styles.camera} type={facing} /> }
      <View style={styles.buttonContainer}>
        <Button title="Cambiar Cámara" onPress={toggleFacing} />
        <Button title="Escanear INE" onPress={() => navigation.navigate('Votar')} />
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
    margin: 10
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ScanIDScreen;
