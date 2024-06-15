import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './pages/LoginScreen';
import ScanIDScreen from './pages/ScanIDScreen';
import CandidatesScreen from './pages/CandidatesScreen.js';
import CandidateDetailsScreen from './pages/CandidateDetailsScreen.js';
import VotingResultsScreen from './pages/VotingResultsScreen.js';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Identificarse" component={ScanIDScreen} />
         <Stack.Screen name="Votar" component={CandidatesScreen} />
         <Stack.Screen name="DetalleDelCandidato" component={CandidateDetailsScreen} />
          <Stack.Screen name="ResultadosVotacion" component={VotingResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
