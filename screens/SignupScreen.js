/*
 * ============================================
 *  SIGNUP SCREEN - Create New Account
 * ============================================
 * 
 * This screen allows new users to create an account.
 * After successful signup, the user goes back to Login screen.
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
export default function SignupScreen({ navigation }) {

  // ========== STATE VARIABLES ==========
  // These store the user's input
  const [name, setName] = useState('');           // User's name
  const [email, setEmail] = useState('');         // User's email
  const [password, setPassword] = useState('');   // User's password

  // ========== SIGNUP FUNCTION ==========
  // This function runs when the user presses the "Sign Up" button
  const handleSignup = async () => {
    try {
      // Send a request to the backend to create a new account
      // We send the name, email, and password to the /signup endpoint
      const response = await axios.post(`${API_URL}/signup`, {
        name: name,
        email: email,
        password: password
      });

      // If signup is successful, show success message
      Alert.alert('Success!', 'Account created successfully. Please login.');

      // Take the user back to the Login screen
      navigation.navigate('Login');

    } catch (error) {
      // If something goes wrong, show an error message to the user
      const errorMessage = error.response?.data?.error || 'Signup failed. Please try again.';
      Alert.alert('Signup Error', errorMessage);
    }
  };

  // ========== USER INTERFACE ==========
  return (
    <View style={styles.container}>
      {/* Page title */}
      <Text style={styles.title}>Sign Up</Text>

      {/* Name input field */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

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

      {/* Sign Up button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Link to go back to login screen */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
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

  // Page title style
  title: {
    fontSize: 32,                 // Large text
    fontWeight: 'bold',           // Make it bold
    marginBottom: 40,             // Space below title
    textAlign: 'center',          // Center the text
  },

  // Input field style (for name, email, and password)
  input: {
    borderWidth: 1,               // Add border
    borderColor: '#ddd',          // Light gray border
    padding: 15,                  // Space inside the box
    marginBottom: 15,             // Space below each input
    borderRadius: 8,              // Rounded corners
    fontSize: 16,                 // Text size
  },

  // Sign Up button style
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

  // Link text style (for "Login" link)
  link: {
    color: '#007AFF',             // Blue color
    textAlign: 'center',          // Center the text
    marginTop: 20,                // Space above link
    fontSize: 16,                 // Text size
  },
});
