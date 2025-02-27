import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewEntryScreen = ({route, navigation}) => {
  const {entry} = route.params;

  const handleDelete = async () => {
    Alert.alert('Delete Entry', 'Are you sure you want to delete this entry?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const jsonEntries = await AsyncStorage.getItem('journal_entries');
            const entries = JSON.parse(jsonEntries);
            const updatedEntries = entries.filter(e => e.id !== entry.id);
            await AsyncStorage.setItem(
              'journal_entries',
              JSON.stringify(updatedEntries),
            );
            navigation.goBack();
          } catch (error) {
            console.error('Error deleting entry:', error);
            Alert.alert('Error', 'Could not delete the entry');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.date}>
          {new Date(entry.date).toLocaleDateString()}
        </Text>
        <Text style={styles.content}>{entry.content}</Text>
      </ScrollView>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete Entry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  content: {
    fontSize: 18,
    color: '#333',
    lineHeight: 24,
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ViewEntryScreen;
