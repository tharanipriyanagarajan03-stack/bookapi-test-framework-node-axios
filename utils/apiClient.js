const axios = require("axios");
const { getUrl } = require("../config/envConfig");

const apiClient = axios.create({
    baseURL: getUrl(),
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
   validateStatus: ()=> true
});
 
apiClient.interceptors.request.use(config => {
 const token = global.ACCESS_TOKEN; // set after login
 if (token) {
   config.headers.Authorization = `Bearer ${token}`;
 }
 return config;
});

module.exports = apiClient;
