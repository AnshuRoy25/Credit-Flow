import dotenv from 'dotenv'

dotenv.config();

const config = {
    mongoURI: process.env.MONGODB_URI,
    port: process.env.PORT,
    frontendURL : process.env.frontendURL,
};

export default config;