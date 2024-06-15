import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';

function CandidateDetailsScreen({ route }) {
  const { candidate } = route.params;

  const handleVote = () => {
    Alert.alert("Confirmación de Voto", `¿Estás seguro de que deseas votar por ${candidate.name}?`, [
      {
        text: "Cancelar",
        style: "cancel"
      },
      {
        text: "Votar",
        onPress: () => {
          Alert.alert("Voto registrado", `Tu voto por ${candidate.name} ha sido registrado exitosamente.`);
        }
      }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={candidate.image} style={styles.image} />
      <Text style={styles.name}>{candidate.name}</Text>
      <Text style={styles.party}>{candidate.party}</Text>
      {candidate.proposals.map((proposal, index) => (
        <Text key={index} style={styles.proposals}>{proposal}</Text>
      ))}
      <Button mode="contained" onPress={handleVote} style={styles.voteButton}>
        Votar por {candidate.name}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center'
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