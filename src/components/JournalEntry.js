import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const JournalEntry = ({ entry, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.date}>
        {new Date(entry.date).toLocaleDateString()}
      </Text>
      <Text style={styles.text} numberOfLines={2}>
        {entry.content}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});

export default JournalEntry;
