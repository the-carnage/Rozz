require('dotenv').config();

module.exports = () => {
  const appJson = require('./app.json');
  
  return {
    ...appJson,
    expo: {
      ...appJson.expo,
      extra: {
        ...(appJson.expo?.extra || {}),
        API_URL: process.env.API_URL || '',
        OTHER_KEY: process.env.OTHER_KEY || '',
      },
    },
  };
};
