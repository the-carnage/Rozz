/*
 * ============================================
 *  LOGIN SCREEN - User Login Page
 * ============================================
 * 
 * This screen allows users to login to their diary account.
 * After successful login, the user goes to the Home screen.
 */

// ========== IMPORTS ==========
// React is the main library for building the UI
import React, { useState } from 'react';

// These are the building blocks for creating the screen
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// axios is used to send requests to the backend server
import axios from 'axios';

// Import the backend URL from our config file
import { API_URL } from '../config';

// ========== MAIN COMPONENT ==========
export default function LoginScreen({ navigation }) {

  // ========== STATE VARIABLES ==========
  // These store the user's input
  // email: stores what the user types in the email field
  const [email, setEmail] = useState('');

  // password: stores what the user types in the password field
  const [password, setPassword] = useState('');

  // ========== LOGIN FUNCTION ==========
  // This function runs when the user presses the "Login" button
  const handleLogin = async () => {
    try {
      // Send a request to the backend to check if login is valid
      // We send the email and password to the /login endpoint
      const response = await axios.post(`${API_URL}/login`, {
        email: email,
        password: password
      });

      // If login is successful, go to the Home screen
      // We pass email and password so other screens can use them
      navigation.navigate('Home', {
        email: email,
        password: password
      });

    } catch (error) {
      // If something goes wrong, show an error message to the user
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      Alert.alert('Login Error', errorMessage);
    }
  };

  // ========== USER INTERFACE ==========
  return (
    <View style={styles.container}>
      {/* App title */}
      <Text style={styles.title}>Rozz Diary</Text>

      {/* Email input field */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password input field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Login button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Link to signup screen */}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

// ========== STYLES ==========
// These define how everything looks on the screen
const styles = StyleSheet.create({
  // Main container - holds everything on the screen
  container: {
    flex: 1,                      // Take up full screen
    padding: 20,                  // Add space around edges
    justifyContent: 'center',     // Center content vertically
    backgroundColor: '#fff',      // White background
  },

  // App title style
  title: {
    fontSize: 40,                 // Large text
    fontWeight: 'bold',           // Make it bold
    marginBottom: 40,             // Space below title
    textAlign: 'center',          // Center the text
    color: '#007AFF',             // Blue color
  },

  // Input field style (for email and password)
  input: {
    borderWidth: 1,               // Add border
    borderColor: '#ddd',          // Light gray border
    padding: 15,                  // Space inside the box
    marginBottom: 15,             // Space below each input
    borderRadius: 8,              // Rounded corners
    fontSize: 16,                 // Text size
  },

  // Login button style
  button: {
    backgroundColor: '#007AFF',   // Blue background
    padding: 15,                  // Space inside button
    borderRadius: 8,              // Rounded corners
    marginTop: 10,                // Space above button
  },

  // Button text style
  buttonText: {
    color: '#fff',                // White text
    textAlign: 'center',          // Center the text
    fontSize: 18,                 // Text size
    fontWeight: 'bold',           // Make it bold
  },

  // Link text style (for "Sign Up" link)
  link: {
    color: '#007AFF',             // Blue color
    textAlign: 'center',          // Center the text
    marginTop: 20,                // Space above link
    fontSize: 16,                 // Text size
  },
});
