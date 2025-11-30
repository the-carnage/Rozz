/*
 * ============================================
 *  HOME SCREEN - Main Menu
 * ============================================
 * 
 * This is the main screen after login.
 * From here, users can:
 * - Write a new diary entry
 * - Read existing diary entries
 * - Logout
 */

// ========== IMPORTS ==========
// React is the main library for building the UI
import React from 'react';

// These are the building blocks for creating the screen
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// ========== MAIN COMPONENT ==========
export default function HomeScreen({ route, navigation }) {

  // ========== GET USER CREDENTIALS ==========
  // When the user logs in, we receive their email and password here
  // We need these to make requests to write/read diary entries
  const { email, password } = route.params;

  // ========== USER INTERFACE ==========
  return (
    <View style={styles.container}>
      {/* Welcome title */}
      <Text style={styles.title}>Welcome to Rozz</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Your Personal Diary</Text>

      {/* Button to go to Write screen */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Write', { email, password })}
      >
        <Text style={styles.buttonText}>✍️ Write Diary</Text>
      </TouchableOpacity>

      {/* Button to go to Read screen */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Read', { email, password })}
      >
        <Text style={styles.buttonText}>📖 Read Diary</Text>
      </TouchableOpacity>

      {/* Logout button - goes back to Login screen */}
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Logout</Text>
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

  // Welcome title style
  title: {
    fontSize: 36,                 // Large text
    fontWeight: 'bold',           // Make it bold
    marginBottom: 10,             // Space below title
    textAlign: 'center',          // Center the text
    color: '#007AFF',             // Blue color
  },

  // Subtitle style
  subtitle: {
    fontSize: 18,                 // Medium text
    marginBottom: 50,             // Space below subtitle
    textAlign: 'center',          // Center the text
    color: '#666',                // Gray color
  },

  // Button style (for Write and Read buttons)
  button: {
    backgroundColor: '#007AFF',   // Blue background
    padding: 20,                  // Space inside button
    borderRadius: 8,              // Rounded corners
    marginBottom: 15,             // Space below each button
  },

  // Button text style
  buttonText: {
    color: '#fff',                // White text
    textAlign: 'center',          // Center the text
    fontSize: 18,                 // Text size
    fontWeight: 'bold',           // Make it bold
  },

  // Special style for logout button (red color)
  logoutButton: {
    backgroundColor: '#FF3B30',   // Red background
    marginTop: 30,                // Extra space above logout button
  },
});
