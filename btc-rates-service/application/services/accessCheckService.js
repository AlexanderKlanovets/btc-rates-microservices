'use strict';

const { AccessDeniedError } = require('./errors');
const { makeGetRequest } = require('../../lib/utils');

class AccessCheckService {
  constructor(authServiceUrl) {
    this.authServiceUrl = authServiceUrl;
  }

  async verifyAccess(authHeader) {
    try {
      await makeGetRequest(
        this.authServiceUrl,
        {
          headers: { authentication: authHeader },
        },
      );
    } catch (err) {
      throw new AccessDeniedError();
    }
  }
}

module.exports = AccessCheckService;
