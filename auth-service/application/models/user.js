'use strict';

const path = require('path');
const fs = require('fs/promises');

const argon2 = require('argon2');

const { AlreadyExistsError, NotFoundError } = require('./errors');
const { mkdirIfNotExistsSync } = require('../../lib/utils');

class User {
  constructor(storagePath) {
    this.storagePath = path.join(storagePath, 'users');
    mkdirIfNotExistsSync(this.storagePath);
  }

  async existsByEmail(email) {
    try {
      const userPath = path.join(this.storagePath, email);
      await fs.access(userPath);

      return true;
    } catch (error) {
      return false;
    }
  }

  async getByEmail(email) {
    const userPath = path.join(this.storagePath, email);

    try {
      const hashedPassword = await fs.readFile(
        userPath,
        { encoding: 'utf8' },
      );

      return { email, password: hashedPassword };
    } catch (error) {
      throw new NotFoundError(
        `The user with the email ${email} was not found.`,
      );
    }
  }

  async create(userData) {
    const { email, password } = userData;

    const userExists = await this.existsByEmail(email);

    if (userExists) {
      throw new AlreadyExistsError(
        `The user with the email "${email}" already exists.`,
      );
    }

    const hashedPassword = await argon2.hash(password);
    const savePath = path.join(this.storagePath, email);
    await fs.writeFile(savePath, hashedPassword);

    return { email, hashedPassword };
  }
}

module.exports = User;
