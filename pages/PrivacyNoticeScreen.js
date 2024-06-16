import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PrivacyNoticeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aviso de Privacidad</Text>
      <Text style={styles.content}>
        Respetamos su privacidad. Este aviso describe cómo manejamos su información personal.
      </Text>
      <Text style={styles.content}>
        1. Recopilación de Datos: Recopilamos información que usted nos proporciona, como su nombre y correo electrónico.
      </Text>
      <Text style={styles.content}>
        2. Uso de Datos: Utilizamos su información para mejorar su experiencia en nuestra aplicación y para comunicarnos con usted.
      </Text>
      <Text style={styles.content}>
        3. Protección de Datos: Su información se almacena de forma segura y tomamos medidas para protegerla contra accesos no autorizados.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Identificarse')}>
        <Text style={styles.buttonText}>Comenzar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 22,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PrivacyNoticeScreen;
