'use strict';

const { AccessDeniedError } = require('./errors');
const { makeHttpGetRequest } = require('../../lib/utils');

class AccessCheckService {
  constructor(authServiceUrl) {
    this.authServiceUrl = authServiceUrl;
  }

  async verifyAccess(authHeader) {
    try {
      await makeHttpGetRequest(
        `${this.authServiceUrl}/user/verifyToken`,
        {
          headers: { authorization: authHeader },
        },
      );
    } catch (err) {
      throw new AccessDeniedError();
    }
  }
}

module.exports = AccessCheckService;
