import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';

export default function WriteScreen({ route, navigation }) {
  const { email, password } = route.params;
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');

  const handleWrite = async () => {
    try {
      const response = await axios.post(`${API_URL}/write`, {
        email,
        password,
        content,
        date
      });
      
      Alert.alert('Success', response.data.message);
      setContent('');
      setDate('');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || error.response?.data?.error || 'Write failed');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Write Your Diary</Text>
      
      <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="2025-11-27"
        value={date}
        onChangeText={setDate}
      />
      
      <Text style={styles.label}>What happened today?</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Write your thoughts..."
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={10}
        textAlignVertical="top"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleWrite}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.backButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
    minHeight: 200,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#8E8E93',
  },
});
