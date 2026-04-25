import dotenv from 'dotenv';
dotenv.config()

import { ERROR_MESSAGES } from '../constants/messages';
import { InternalServerError } from '../errors/CustomErrors';

export const env = {
   port: process.env.PORT || 5000,
   omdb_api_key: process.env.OMDB_API_KEY || '',
   omdb_base_url: process.env.OMDB_BASE_URL || 'http://www.omdbapi.com/',
   frontend_url: process.env.FRONTEND_URL || 'http://localhost:5173',
}

export const checkEnv = () => {
   if (env.omdb_api_key === '') {
      throw new InternalServerError(ERROR_MESSAGES.MISSING_OMDB_API_KEY);
   }
}