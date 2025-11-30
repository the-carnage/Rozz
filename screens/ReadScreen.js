/*
 * ============================================
 *  READ SCREEN - View Diary Entries
 * ============================================
 * 
 * This screen allows users to read their past diary entries.
 * You enter a date and it shows you what you wrote on that day.
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
export default function ReadScreen({ route, navigation }) {

  // ========== GET USER CREDENTIALS ==========
  // We need the user's email and password to get their diary entries
  const { email, password } = route.params;

  // ========== STATE VARIABLES ==========
  const [date, setDate] = useState('');              // The date to search for
  const [content, setContent] = useState('');        // The diary content we found
  const [showContent, setShowContent] = useState(false);  // Whether to show the content

  // ========== READ FUNCTION ==========
  // This function runs when the user presses the "Read Entry" button
  const handleRead = async () => {
    try {
      // Ask the backend for the diary entry for this date
      // We send: email, password, and date
      const response = await axios.post(`${API_URL}/read`, {
        email: email,
        password: password,
        date: date
      });

      // If we found an entry, show it to the user
      setContent(response.data.content);
      setShowContent(true);

    } catch (error) {
      // If something goes wrong, show an error message
      const errorMessage = error.response?.data?.message ||
        error.response?.data?.error ||
        'No entry found for this date.';
      Alert.alert('Error', errorMessage);

      // Hide any previous content
      setContent('');
      setShowContent(false);
    }
  };

  // ========== USER INTERFACE ==========
  return (
    <ScrollView style={styles.container}>
      {/* Page title */}
      <Text style={styles.title}>Read Your Diary</Text>

      {/* Date input section */}
      <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="2025-11-27"
        value={date}
        onChangeText={setDate}
      />

      {/* Read button */}
      <TouchableOpacity style={styles.button} onPress={handleRead}>
        <Text style={styles.buttonText}>Read Entry</Text>
      </TouchableOpacity>

      {/* Show the diary content if we found an entry */}
      {/* This only appears after pressing "Read Entry" */}
      {showContent && (
        <View style={styles.contentBox}>
          <Text style={styles.contentLabel}>Your Entry:</Text>
          <Text style={styles.content}>{content}</Text>
        </View>
      )}

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

  // Label style (for "Date")
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

  // Button style
  button: {
    backgroundColor: '#007AFF',   // Blue background
    padding: 15,                  // Space inside button
    borderRadius: 8,              // Rounded corners
    marginBottom: 20,             // Space below button
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

  // Box that contains the diary entry content
  contentBox: {
    backgroundColor: '#f5f5f5',   // Light gray background
    padding: 20,                  // Space inside the box
    borderRadius: 8,              // Rounded corners
    marginBottom: 20,             // Space below the box
  },

  // "Your Entry:" label style
  contentLabel: {
    fontSize: 18,                 // Medium-large text
    fontWeight: 'bold',           // Make it bold
    marginBottom: 10,             // Space below label
    color: '#007AFF',             // Blue color
  },

  // The actual diary content text style
  content: {
    fontSize: 16,                 // Medium text
    lineHeight: 24,               // Space between lines for readability
    color: '#333',                // Dark gray color
  },
});
