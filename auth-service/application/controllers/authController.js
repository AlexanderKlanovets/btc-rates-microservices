/* eslint class-methods-use-this: 0 */

'use strict';

const serviceErrorsToHttpStatusMap = require('./serviceErrorsToHttpStatusMap');

class AuthController {
  constructor(authService, logger) {
    this.authService = authService;
    this.logger = logger;
  }

  handleServiceErrorAndSendResponse(err, res) {
    const status = serviceErrorsToHttpStatusMap[err.name];

    if (!status) {
      this.logger.error(err.message);

      res.status(500).json({ message: 'Unknown error!' });

      return;
    }

    res.status(status).json({ message: err.message });
  }

  async register(req, res) {
    const { email, password } = req.body;

    try {
      await this.authService.register({ email, password });
      res.status(200).json({ message: 'Successfully registered.' });
    } catch (err) {
      this.handleServiceErrorAndSendResponse(err, res);
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const tokenPair = await this.authService.login({ email, password });
      res.status(200).json(tokenPair);
    } catch (err) {
      this.handleServiceErrorAndSendResponse(err, res);
    }
  }

  async refresh(req, res) {
    const { refreshToken } = req.body;

    try {
      const newtokenPair = await this.authService.refresh(refreshToken);
      res.status(200).json(newtokenPair);
    } catch (err) {
      this.handleServiceErrorAndSendResponse(err, res);
    }
  }

  async logout(req, res) {
    const { email } = req.user;

    try {
      await this.authService.logout(email);
      res.status(200).json({ message: 'Logout successful.' });
    } catch (err) {
      this.handleServiceErrorAndSendResponse(err, res);
    }
  }

  verifyToken(req, res) {
    const { authorization } = req.headers;

    try {
      this.authService.getTokenFromAuthHeaderAndVerify(authorization);
      res.status(200).json({ message: 'Token verified.' });
    } catch (err) {
      this.handleServiceErrorAndSendResponse(err, res);
    }
  }
}

module.exports = AuthController;
