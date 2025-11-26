import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';

export default function ReadScreen({ route, navigation }) {
  const { email, password } = route.params;
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [showContent, setShowContent] = useState(false);

  const handleRead = async () => {
    try {
      const response = await axios.post(`${API_URL}/read`, {
        email,
        password,
        date
      });
      
      setContent(response.data.content);
      setShowContent(true);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || error.response?.data?.error || 'Read failed');
      setContent('');
      setShowContent(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Read Your Diary</Text>
      
      <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="2025-11-27"
        value={date}
        onChangeText={setDate}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleRead}>
        <Text style={styles.buttonText}>Read Entry</Text>
      </TouchableOpacity>
      
      {showContent && (
        <View style={styles.contentBox}>
          <Text style={styles.contentLabel}>Your Entry:</Text>
          <Text style={styles.content}>{content}</Text>
        </View>
      )}
      
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
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
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
  contentBox: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  contentLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});
