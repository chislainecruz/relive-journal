import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewEntryScreen = ({ navigation }) => {
  const [content, setContent] = useState("");

  const saveEntry = async () => {
    if (!content.trim()) {
      Alert.alert("Error", "Please write something to save");
      return;
    }

    try {
      const newEntry = {
        id: Date.now().toString(),
        content: content.trim(),
        date: new Date().toISOString(),
      };

      const existingEntries = await AsyncStorage.getItem("journal_entries");
      const entries = existingEntries ? JSON.parse(existingEntries) : [];
      entries.push(newEntry);

      await AsyncStorage.setItem("journal_entries", JSON.stringify(entries));
      navigation.goBack();
    } catch (error) {
      console.error("Error saving entry:", error);
      Alert.alert("Error", "Could not save your entry");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        placeholder="What are you grateful for today?"
        value={content}
        onChangeText={setContent}
        autoFocus
      />
      <TouchableOpacity style={styles.button} onPress={saveEntry}>
        <Text style={styles.buttonText}>Save Entry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NewEntryScreen;
