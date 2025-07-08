import { API_BASE_URL as DEV_API_BASE_URL } from './config.development';
import { API_BASE_URL as PROD_API_BASE_URL } from './config.production';

export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? PROD_API_BASE_URL
  : DEV_API_BASE_URL;