/* eslint class-methods-use-this: 0 */

'use strict';

const serviceToHttpErrorsMap = require('./serviceToHttpErrorsMap');

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  passErrorToErrorHandler(err, errorHandler) {
    const HttpError = serviceToHttpErrorsMap[err.name];

    errorHandler(HttpError ? new HttpError(err.message) : err);
  }

  async register(req, res, next) {
    const { email, password } = req.body;

    try {
      await this.authService.register({ email, password });

      res.status(200).json({ message: 'Successfully registered.' });
    } catch (err) {
      this.passErrorToErrorHandler(err, next);
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const tokenPair = await this.authService.login({ email, password });

      res.status(200).json(tokenPair);
    } catch (err) {
      this.passErrorToErrorHandler(err, next);
    }
  }

  async refresh(req, res, next) {
    const { refreshToken } = req.body;

    try {
      const newtokenPair = await this.authService.refresh(refreshToken);

      res.status(200).json(newtokenPair);
    } catch (err) {
      this.passErrorToErrorHandler(err, next);
    }
  }

  async logout(req, res, next) {
    const { email } = req.user;

    try {
      await this.authService.logout(email);

      res.status(200).json({ message: 'Logout successful.' });
    } catch (err) {
      this.passErrorToErrorHandler(err, next);
    }
  }

  verifyToken(req, res, next) {
    const { authorization } = req.headers;

    try {
      this.authService.getTokenFromAuthHeaderAndVerify(authorization);

      res.status(200).json({ message: 'Token verified.' });
    } catch (err) {
      this.passErrorToErrorHandler(err, next);
    }
  }
}

module.exports = AuthController;
