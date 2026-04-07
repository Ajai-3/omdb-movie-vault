import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.OMDB_API_KEY;
const BASE_URL = process.env.OMDB_BASE_URL;

export const searchMovies = async (query: string, page: number = 1) => {
  const response = await axios.get(`${BASE_URL}/`, {
    params: {
      apikey: API_KEY,
      s: query,
      page: page,
    },
  });
  return response.data;
};
