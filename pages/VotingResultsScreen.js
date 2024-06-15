import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const VotingResultsScreen = () => {
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

  const data = [
    { name: "Xochitl Gálvez", population: 215, color: "rgba(131, 167, 234, 1)", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Claudia Sheinbaum", population: 280, color: "#F00", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Maynez", population: 105, color: "yellow", legendFontColor: "#7F7F7F", legendFontSize: 15 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resultados de Votaciones</Text>
      <PieChart
        data={data}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 50]}
        absolute
      />
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
