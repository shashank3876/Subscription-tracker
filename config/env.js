import {config} from 'dotenv';

// Correctly construct the path based on NODE_ENV
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { PORT, NODE_ENV,DB_URI,JWT_SECRET,JWT_EXPIRES_IN} = process.env;