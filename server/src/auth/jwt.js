import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';

const createTokens = async (user, accessToken, refreshToken) => {
  const createToken = jwt.sign(
    {
      user: _.pick(user, ['id', 'username', 'role']),
    },
    accessToken,
    {
      expiresIn: '5m',
    }
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, 'id'),
    },
    refreshToken,
    {
      expiresIn: '1d',
    }
  );

  return [createToken, createRefreshToken];
};

export const refreshTokens = async (refreshToken, db) => {
  let userId = null;
  try {
    const {
      user: { id },
    } = jwt.decode(refreshToken);
    userId = id;
  } catch (err) {
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = await db.User.findOne({ where: { id: userId }, raw: true });

  if (!user || user.suspended === true) {
    return {};
  }

  const refreshSecret = user.password + process.env.JWT_REFRESH_SECRET;
  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (err) {
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(
    user,
    process.env.JWT_ACCESS_SECRET,
    refreshSecret
  );
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

export const tryLogin = async (email, password, db) => {
  const user = await db.User.findOne({
    where: {
      email: {
        [db.op.iLike]: email,
      },
    },
    raw: true,
  });

  if (!user) {
    return {
      success: false,
      errors: [{ path: 'email', message: 'Wrong email' }],
    };
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return {
      success: false,
      errors: [{ path: 'password', message: 'Wrong password' }],
    };
  }

  if (user.suspended === true) {
    return {
      success: false,
      errors: [
        { path: 'suspended', message: 'Your account has been suspended.' },
      ],
    };
  }

  const refreshTokenSecret = user.password + process.env.JWT_REFRESH_SECRET;

  const [token, refreshToken] = await createTokens(
    user,
    process.env.JWT_ACCESS_SECRET,
    refreshTokenSecret
  );

  return {
    success: true,
    token,
    refreshToken,
    user,
  };
};
