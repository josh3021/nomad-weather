import { StatusBar } from "expo-status-bar";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar animated={true} style="auto" />
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>14</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>14</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>14</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>14</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>14</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>14</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>14</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
  },
  city: {
    flex: 1,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 50,
    fontWeight: "bold",
  },
  weather: {
    backgroundColor: "gray",
  },
  day: {
    flex: 6,
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontWeight: "600",
    fontSize: 178,
  },
  description: {
    fontSize: 60,
    marginTop: -30,
  },
});
