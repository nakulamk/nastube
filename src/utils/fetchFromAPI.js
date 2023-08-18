const axios = require("axios");
export const BASE_URL = "https://youtube-v31.p.rapidapi.com";
const options = {
  // url: "https://youtube-v31.p.rapidapi.com",
  params: {
    maxResults: 50,
  },
  headers: {
    "X-RapidAPI-Key": "dfe3ce08eamsh9551c900a1b755ep1dc34cjsna7155636dc66",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};
