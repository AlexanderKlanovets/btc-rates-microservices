'use strict';

const {
  existsSync,
  mkdirSync,
} = require('fs');

const jwt = require('jsonwebtoken');

const getTokenFromHeader = (authHeader) => {
  if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
    return authHeader.split(' ')[1];
  }

  throw new Error('Missing Authentication Token');
};

const verifyJwtTokenFromAuthHeader = (authHeader, jwtSecret) => {
  const token = getTokenFromHeader(authHeader);

  jwt.verify(token, jwtSecret);
};

const mkdirIfNotExistsSync = (dirPath) => {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath);
  }
};

module.exports = {
  verifyJwtTokenFromAuthHeader,
  mkdirIfNotExistsSync,
};
