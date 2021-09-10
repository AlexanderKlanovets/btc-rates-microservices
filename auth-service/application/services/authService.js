'use strict';

const argon2 = require('argon2');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const {
  NotFoundError,
  AlreadyExistsError,
} = require('../models/errors');

const { validateUserDataOrThrow } = require('./validation/helpers');
const {
  InvalidCredentialsError,
  UserNotFoundError,
  UserAlreadyExistsError,
  TokenVerificationError,
} = require('./errors');

const verifyJwtTokenFromAuthHeader = require('../../lib/utils');

class AuthService {
  constructor(userModel, refreshTokenModel, options) {
    this.userModel = userModel;
    this.refreshTokenModel = refreshTokenModel;
    this.jwtSecret = options.jwtSecret;
  }

  async register(userData) {
    validateUserDataOrThrow(userData);

    try {
      const savedUser = await this.userModel.create(userData);

      return { email: savedUser.email };
    } catch (err) {
      if (err instanceof AlreadyExistsError) {
        throw new UserAlreadyExistsError(err.message);
      }

      throw err;
    }
  }

  async issueTokenPair(email) {
    const TOKEN_LIFETIME_IN_SECONDS = 15 * 60;

    const newRefreshToken = uuidv4();

    await this.refreshTokenModel.add({
      refreshToken: newRefreshToken,
      email,
    });

    return {
      token: jwt.sign(
        {
          exp: TOKEN_LIFETIME_IN_SECONDS,
          email,
        },
        this.jwtSecret,
      ),
      refreshToken: newRefreshToken,
    };
  }

  async login(userData) {
    validateUserDataOrThrow(userData);

    const { email, password } = userData;

    try {
      const user = await this.userModel.getByEmail(email);
      const correctPassword = await argon2.verify(user.password, password);

      if (!correctPassword) {
        throw new InvalidCredentialsError();
      }

      return this.issueTokenPair(email);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new UserNotFoundError(err.message);
      }

      throw err;
    }
  }

  async refresh(refreshToken) {
    const refreshTokenRecord = await this.refreshTokenModel.get(refreshToken);

    await this.refreshTokenModel.delete({ refreshToken });

    return this.issueTokenPair(refreshTokenRecord.email);
  }

  async logout(email) {
    await this.refreshTokenModel.delete({ email });
  }

  getTokenFromAuthHeaderAndVerify(authHeader) {
    try {
      verifyJwtTokenFromAuthHeader(authHeader, this.jwtSecret);
    } catch (err) {
      throw new TokenVerificationError();
    }
  }
}

module.exports = AuthService;
