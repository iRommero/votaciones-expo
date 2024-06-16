import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Image } from 'react-native';
import { Card, Button } from 'react-native-paper';
import FaceDetectionScreen from './FaceDetectionScreen';
import CandidateService from '../services/CandidateService';

let paddingTop = 160;

function CandidatesScreen({ navigation }) {
  const [candidates, setCandidates] = useState([]);

  const images = {
    'antuna.jpg': require('../assets/icon/img/antuna.jpg'),
    'frank.jpg': require('../assets/icon/img/frank.jpg'),
    'guimel.jpg': require('../assets/icon/img/guimel.jpg'),
  }

  useEffect(() => {
    getCandidates();
  }, [])

  const getCandidates = async () => {
    try {
      const candidateService = new CandidateService();
      const candidates = await candidateService.getCandidates();
      setCandidates(candidates);
    } catch (error) {
      console.error(error);
    }
  }

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.nombre}
        subtitle={item.partido.nombre}
        left={(props) => <Image {...props} source={item.imagen.includes('assets')
          ? images[item.imagen.split('/').pop()]  // Usa directamente el objeto
          : { uri: item.imagen }}
          style={styles.image} />}
      />
      <Card.Actions>
        <Button mode="text" onPress={() => navigation.navigate('DetalleDelCandidato', { candidate: item })}>
          Leer más
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      { }
      <View style={styles.faceDetectionContainer}>
        <FaceDetectionScreen navigation={navigation} />
      </View>
      <FlatList
        data={candidates}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => navigation.navigate('ResultadosVotacion')}>
          Resultados de votaciones
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  faceDetectionContainer: {
    width: '100%',
    height: 150,  // Ajusta esto según el tamaño de la cámara
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,  // Asegura que la cámara esté sobre los otros elementos
    padding: 10
  },
  listContainer: {
    paddingTop: paddingTop,  // Ajusta esto para que las tarjetas comiencen debajo de la cámara
  },
  card: {
    margin: 10,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  buttonContainer: {
    padding: 20  // Reducido de 50 para más consistencia en la interfaz
  }
});

export default CandidatesScreen;




