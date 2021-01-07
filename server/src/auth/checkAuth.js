import db from '../db';
import { refreshTokens } from './jwt';

const checkAuth = async (req, res, next) => {
  const token = req.headers['access-token'];

  if (token) {
    try {
      const { user } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['refresh-token'];
      const newTokens = await refreshTokens(refreshToken, db);

      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'access-token, refresh-token');
        res.set('access-token', newTokens.token);
        res.set('refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  } else {
    req.user = null;
  }
  next();
};

export default checkAuth;
