import dotenv from 'dotenv';
import path from 'path';

// Cargamos .env.dev con dotenv (NO dotenv-safe)
dotenv.config({ path: path.resolve(__dirname, '.env.dev') });

// Imprimimos las variables cargadas
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
console.log("GOOGLE_CALLBACK_URL:", process.env.GOOGLE_CALLBACK_URL);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("MONGO_URI:", process.env.MONGO_URI);
