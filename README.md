# Rozz - Simple Diary App

A very simple React Native diary app with signup, login, write, and read features.

## Setup Instructions

### 1. Find Your Computer's IP Address

**Mac:**
- Go to System Settings > Network
- Select your connection (WiFi or Ethernet)
- Find your IP address (e.g., 192.168.1.100)

**Windows:**
- Open Command Prompt
- Type `ipconfig`
- Look for IPv4 Address

### 2. Update the API URL

Edit `config.js` and replace `192.168.1.100` with your computer's IP address:

```javascript
export const API_URL = 'http://YOUR_IP_HERE:3000';
```

### 3. Make Sure Backend is Running

In the `Rozz_Backend` folder:
```bash
npm start
```

Server should be running on port 3000.

### 4. Run the App

```bash
npm start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## Features

- **Signup**: Create a new account
- **Login**: Sign in with email and password
- **Write**: Save diary entries for specific dates
- **Read**: View your diary entries by date

## Date Format

Use YYYY-MM-DD format for dates (e.g., 2025-11-27)

## Troubleshooting

### "Network Error" or "Request Failed"

1. Make sure backend server is running
2. Check that API_URL in `config.js` has correct IP
3. Ensure your phone/simulator is on same network as computer
4. For iOS simulator, try: `http://localhost:3000`
5. For Android emulator, try: `http://10.0.2.2:3000`

### Backend Not Starting

1. Make sure MongoDB is connected
2. Check `.env` file has correct DATABASE_URL
3. Run `npx prisma generate` in backend folder
