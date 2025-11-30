/*
 * ============================================
 *  WRITE SCREEN - Create Diary Entry
 * ============================================
 * 
 * This screen allows users to write a new diary entry.
 * Each entry is saved with a date, so you can only have
 * one entry per date (like a real diary!)
 */

// ========== IMPORTS ==========
// React is the main library for building the UI
import React, { useState } from 'react';

// These are the building blocks for creating the screen
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

// axios is used to send requests to the backend server
import axios from 'axios';

// Import the backend URL from our config file
import { API_URL } from '../config';

// ========== MAIN COMPONENT ==========
export default function WriteScreen({ route, navigation }) {

  // ========== GET USER CREDENTIALS ==========
  // We need the user's email and password to save the diary entry
  const { email, password } = route.params;

  // ========== STATE VARIABLES ==========
  // These store what the user types
  const [date, setDate] = useState('');           // The date for this entry
  const [content, setContent] = useState('');     // The diary content

  // ========== WRITE FUNCTION ==========
  // This function runs when the user presses the "Save" button
  const handleWrite = async () => {
    try {
      // Send the diary entry to the backend to be saved
      // We send: email, password, date, and content
      const response = await axios.post(`${API_URL}/write`, {
        email: email,
        password: password,
        content: content,
        date: date
      });

      // If save is successful, show success message
      Alert.alert('Success!', 'Your diary entry has been saved.');

      // Clear the input fields so user can write a new entry
      setContent('');
      setDate('');

    } catch (error) {
      // If something goes wrong, show an error message
      const errorMessage = error.response?.data?.message ||
        error.response?.data?.error ||
        'Failed to save entry. Please try again.';
      Alert.alert('Error', errorMessage);
    }
  };

  // ========== USER INTERFACE ==========
  return (
    <ScrollView style={styles.container}>
      {/* Page title */}
      <Text style={styles.title}>Write Your Diary</Text>

      {/* Date input section */}
      <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="2025-11-27"
        value={date}
        onChangeText={setDate}
      />

      {/* Content input section */}
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

      {/* Save button */}
      <TouchableOpacity style={styles.button} onPress={handleWrite}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      {/* Back button */}
      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ========== STYLES ==========
// These define how everything looks on the screen
const styles = StyleSheet.create({
  // Main container - holds everything on the screen
  // ScrollView allows scrolling if content is too long
  container: {
    flex: 1,                      // Take up full screen
    padding: 20,                  // Add space around edges
    backgroundColor: '#fff',      // White background
  },

  // Page title style
  title: {
    fontSize: 28,                 // Large text
    fontWeight: 'bold',           // Make it bold
    marginBottom: 20,             // Space below title
    marginTop: 20,                // Space above title
  },

  // Label style (for "Date" and "What happened today?")
  label: {
    fontSize: 16,                 // Medium text
    fontWeight: '600',            // Semi-bold
    marginBottom: 8,              // Space below label
    color: '#333',                // Dark gray color
  },

  // Date input field style
  input: {
    borderWidth: 1,               // Add border
    borderColor: '#ddd',          // Light gray border
    padding: 15,                  // Space inside the box
    marginBottom: 20,             // Space below input
    borderRadius: 8,              // Rounded corners
    fontSize: 16,                 // Text size
  },

  // Content text area style (bigger input for diary content)
  textArea: {
    borderWidth: 1,               // Add border
    borderColor: '#ddd',          // Light gray border
    padding: 15,                  // Space inside the box
    marginBottom: 20,             // Space below text area
    borderRadius: 8,              // Rounded corners
    fontSize: 16,                 // Text size
    minHeight: 200,               // Make it tall for writing
  },

  // Button style
  button: {
    backgroundColor: '#007AFF',   // Blue background
    padding: 15,                  // Space inside button
    borderRadius: 8,              // Rounded corners
    marginBottom: 10,             // Space below button
  },

  // Button text style
  buttonText: {
    color: '#fff',                // White text
    textAlign: 'center',          // Center the text
    fontSize: 18,                 // Text size
    fontWeight: 'bold',           // Make it bold
  },

  // Special style for back button (gray color)
  backButton: {
    backgroundColor: '#8E8E93',   // Gray background
  },
});
