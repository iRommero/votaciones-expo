import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Title, Provider as PaperProvider } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    console.log('Login attempt with:', email, password);
    navigation.navigate('Identificarse');
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Iniciar sesión</Title>
            <TextInput
              label="Correo electrónico"
              value={email}
              onChangeText={text => setEmail(text)}
              mode="outlined"
              style={styles.input}
              autoCapitalize="none"
            />
            <TextInput
              label="Contraseña"
              value={password}
              onChangeText={text => setPassword(text)}
              mode="outlined"
              style={styles.input}
              secureTextEntry
            />
            <Button mode="contained" onPress={handleLogin} style={styles.button}>
              Iniciar sesión
            </Button>
          </Card.Content>
        </Card>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  }
});

export default LoginScreen;
