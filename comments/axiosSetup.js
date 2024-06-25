const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: process.env.POSTS_API_URL,
  timeout: 5_000,
  maxBodyLength: 500_000,
  maxContentLength: 500_000,
});

module.exports = {
  axiosInstance,
};
