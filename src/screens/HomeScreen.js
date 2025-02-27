import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JournalEntry from '../components/JournalEntry';

const HomeScreen = ({navigation}) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Add navigation listener to refresh entries when screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      loadEntries();
    });

    // Initial load of entries
    loadEntries();

    // Cleanup subscription on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const jsonEntries = await AsyncStorage.getItem('journal_entries');
      if (jsonEntries) {
        setEntries(JSON.parse(jsonEntries));
      }
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  };

  const handleEntryPress = entry => {
    navigation.navigate('ViewEntry', {entry});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={entries.sort((a, b) => b.date - a.date)}
        renderItem={({item}) => (
          <JournalEntry entry={item} onPress={() => handleEntryPress(item)} />
        )}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NewEntry')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default HomeScreen;
