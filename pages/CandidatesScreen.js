const candidates = [
  {
    id: 1,
    name: "Xochitl Gálvez",
    party: "Partido Acción Nacional",
    proposals: [
      "Mejora de infraestructura educativa.",
      "Ampliación del acceso a servicios de salud mental.",
      "Desarrollo de programas de energías renovables."
    ],
    image: require('../assets/x.webp')
  },
  {
    id: 2,
    name: "Claudia Sheinbaum",
    party: "Morena",
    proposals: [
      "Expansión del sistema de transporte público.",
      "Incremento en la inversión en ciencia y tecnología.",
      "Fortalecimiento de políticas de igualdad de género."
    ],
    image: require('../assets/cs.webp')
  },
  {
    id: 3,
    name: "Maynez",
    party: "Movimiento Ciudadano",
    proposals: [
      "Reforma fiscal para impulsar la economía.",
      "Aumento del presupuesto en seguridad pública.",
      "Programas de apoyo a pequeñas y medianas empresas."
    ],
    image: require('../assets/m.jpg')
  }
];

import React from 'react';
import { FlatList, View, StyleSheet, Image } from 'react-native';
import { Card, Button } from 'react-native-paper';

function CandidatesScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.name}
        subtitle={item.party}
        left={(props) => <Image {...props} source={item.image} style={styles.image} />}
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
      <FlatList
        data={candidates}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 50 }}
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
    padding: 50
  }
});

export default CandidatesScreen;




