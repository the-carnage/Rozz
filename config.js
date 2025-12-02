/*
 * ============================================
 *  ROZZ DIARY APP - CONFIGURATION FILE
 * ============================================
 * 
 * This file contains the settings for the app.
 * The most important setting is the API_URL which tells
 * the app where to find the backend server.
 * 
 * HOW TO UPDATE THE BACKEND URL:
 * --------------------------------
 * Simply change the URL below to match where your backend is hosted.
 * 
 * Examples:
 * - Hosted backend: 'https://your-backend.com'
 * - Local backend: 'http://localhost:3000'
 * - iOS Simulator: 'http://localhost:3000'
 * - Android Emulator: 'http://10.0.2.2:3000'
 * - Physical device: 'http://YOUR_COMPUTER_IP:3000'
 * 
 * IMPORTANT: Make sure there's no slash (/) at the end of the URL
 */

// The backend server URL - Configured for your local network
// This allows your phone to connect to your computer
export const API_URL = 'http://localhost:3000';

/*
 * That's it! This is the only configuration you need.
 * The screens will automatically use this URL to connect to the backend.
 */
