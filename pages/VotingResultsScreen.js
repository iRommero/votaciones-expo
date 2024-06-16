import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import CandidateService from '../services/CandidateService';

const VotingResultsScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getVotingResults();
  }, []);

  const getVotingResults = async () => {
    try {
      const candidateService = new CandidateService();
      const results = await candidateService.getVotingResults();  // Suponemos que esto devuelve algo como {"Forrest Gump": 1, "Other Movie": 2}

      // Transformar los resultados en un formato adecuado para PieChart
      const formattedData = Object.entries(results).map(([key, value], index) => ({
        name: key,
        value: value,
        color: getRandomColor(),  // Asignar un color aleatorio a cada sección del gráfico
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }));

      setData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para generar colores aleatorios
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };


  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resultados de Votaciones</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center', height: 250 }}>
        <PieChart
          data={data}
          width={Dimensions.get("window").width}  // Asegúrate de que el ancho se ajusta al dispositivo
          height={220}                            // Altura suficiente para el gráfico
          chartConfig={chartConfig}
          accessor={"value"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}                      // Ajusta esto si es necesario
          center={[10, 10]}                       // Ajusta esto si es necesario
          avoidFalseZero={true}                   // Intenta evitar el cero falso
          absolute={true}
        />
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 22,
    margin: 10
  }
});

export default VotingResultsScreen;
