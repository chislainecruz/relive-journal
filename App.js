import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import NewEntryScreen from "./src/screens/NewEntryScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Gratitude Journal" }}
        />
        <Stack.Screen
          name="NewEntry"
          component={NewEntryScreen}
          options={{ title: "New Entry" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
