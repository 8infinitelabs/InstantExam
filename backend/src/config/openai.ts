import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv-safe';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.pro' : '.env.dev',
  example: '.env.example'
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;
