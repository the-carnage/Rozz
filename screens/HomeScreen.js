import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ route, navigation }) {
  const { email, password } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Rozz</Text>
      <Text style={styles.subtitle}>Your Personal Diary</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Write', { email, password })}
      >
        <Text style={styles.buttonText}>✍️ Write Diary</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Read', { email, password })}
      >
        <Text style={styles.buttonText}>📖 Read Diary</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#007AFF',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 50,
    textAlign: 'center',
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    marginTop: 30,
  },
});
