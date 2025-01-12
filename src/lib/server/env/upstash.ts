import dotenv from 'dotenv';

dotenv.config();
export const UPSTASH_API_KEY = process.env.KV_REST_API_TOKEN;
export const UPSTASH_API_URL = process.env.KV_REST_API_URL;
