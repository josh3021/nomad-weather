import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const API_KEY = "b69bf60e5038059f92783440ee4ed954";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MAX_DOTS = 3;
const INTERVAL_MS = 500;

export default function App() {
  const [location, setLocation] = useState<string>("Waiting");
  const [days, setDays] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState<number>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [amountOfDots, setAmountOfDots] = useState<number>(0);

  const requestLocationPermissions = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED) {
      setErrorMessage("Permission to access location was denied");
      return;
    }
    const {
      coords: { latitude, longitude },
      timestamp,
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    getLocation(latitude, longitude);
    getWeather(latitude, longitude);
    setLastUpdated(timestamp);
  }, []);

  const getWeather = async (latitude: number, longitude: number) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    console.log(json.daily);
    setDays(json.daily);
  };

  const getLocation = async (latitude: number, longitude: number) => {
    const [verboseLocation] = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      {
        useGoogleMaps: false,
      }
    );
    setLocation(`${verboseLocation.city} ${verboseLocation.district}`);
  };

  useEffect(() => {
    requestLocationPermissions();
  }, [requestLocationPermissions]);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }
    setLocation(errorMessage);
  }, [errorMessage]);

  return (
    <View style={styles.container}>
      <StatusBar animated style="auto" />
      <View style={styles.city}>
        <Text style={styles.cityName}>
          {location
            ? location
            : `${location}${Array(amountOfDots).map(() => ".")}`}
        </Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 20 }}
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View style={styles.day}>
              <Text style={styles.week}>D-{index}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>
                <Text style={styles.unit}>℃</Text>
              </View>
              <Text style={styles.title}>{day.weather[0].main}</Text>
              <Text style={styles.description}>
                {day.weather[0].description}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 50,
    fontWeight: "bold",
  },
  weather: {
    backgroundColor: "orange",
  },
  day: {
    flex: 5,
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  week: {
    fontSize: 60,
  },
  temp: {
    marginTop: 30,
    fontWeight: "500",
    fontSize: 110,
  },
  unit: {
    fontSize: 30,
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
  },
  description: {
    fontSize: 20,
  },
});
