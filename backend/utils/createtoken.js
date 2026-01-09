
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const createTokenForUser = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
    role: user.role,
  };

  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  });

  return token;
};

export default createTokenForUser;
