import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import FaceDetectionScreen from './FaceDetectionScreen';
import CandidateService from '../services/CandidateService';

function CandidateDetailsScreen({ navigation, route }) {
  const { candidate } = route.params;

  const images = {
    'antuna.jpg': require('../assets/icon/img/antuna.jpg'),
    'frank.jpg': require('../assets/icon/img/frank.jpg'),
    'guimel.jpg': require('../assets/icon/img/guimel.jpg'),
  }

  const handleVote = () => {
    Alert.alert("Confirmación de Voto", `¿Estás seguro de que deseas votar por ${candidate.nombre}?`, [
      {
        text: "Cancelar",
        style: "cancel"
      },
      {
        text: "Votar",
        onPress: async () => {
          try {
            const candidateService = new CandidateService();
            await candidateService.voteForCandidate(candidate.nombre);
            alert('Voto registrado exitosamente');
            navigation.navigate('ResultadosVotacion');
          } catch (error) {
            alert('Ya votaste una vez, no puedes votar de nuevo');
            console.error(error);
          }
        }
      }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.faceDetectionContainer}>
        <FaceDetectionScreen navigation={navigation} />
      </View>
      <Image source={candidate.imagen.includes('assets') ? images[candidate.imagen.split('/').pop()] : { uri: candidate.imagen }} style={styles.image} />
      <Text style={styles.name}>{candidate.nombre}</Text>
      <Text style={styles.party}>{candidate.partido.nombre}</Text>
      {candidate.partido.propuestas.map((proposal, index) => (
        <Text key={index} style={styles.proposals}>{proposal.texto}</Text>
      ))}
      <Button mode="contained" onPress={handleVote} style={styles.voteButton}>
        Votar por {candidate.nombre}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 40
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center'
  },
  party: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20
  },
  proposals: {
    fontSize: 16,
    textAlign: 'justify',
    marginTop: 10
  },
  voteButton: {
    marginTop: 20
  }
});

export default CandidateDetailsScreen;