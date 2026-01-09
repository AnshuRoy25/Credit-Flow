import dotenv from 'dotenv'

dotenv.config();

const config = {
    mongoURI: process.env.MONGODB_URI,
    port: process.env.PORT,
    frontendURL : process.env.frontendURL,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE || '7d'
};

export default config;