const dotenv = require('dotenv');
const path = require('path');

let config = null;

function loadConfig() {
  if (config) return config;

  const env = (process.env.ENV || 'qa').trim().toLowerCase();

  // Determine which .env file to load
  const envFilePath = path.resolve(__dirname, `../book.env.${env}`);
  dotenv.config({ path: envFilePath });

  // Validate required values
  if (!process.env.URL || !process.env.EMAIL || !process.env.PASSWORD) {
    throw new Error(`Missing environment variables in ${envFilePath}`);
  }

  config = {
    url: process.env.URL,
    email: process.env.EMAIL,
    password: process.env.PASSWORD
  };

  return config;
}

// Utility functions
function getUrl() {
  return loadConfig().url;
}

function getEmail() {
  return loadConfig().email;
}

function getPassword() {
  return loadConfig().password;
}

module.exports = { getUrl, getEmail, getPassword };