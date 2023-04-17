import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { errorMessageFormated, successFormatResponse } from '../../core/core';
import ConfigManager from '../../managers/config.manager';

const adminUser = {
  username: 'admin',
  password: 'admin',
};

const controller = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const config = ConfigManager.currentConfig
  // Check if the username and password match the hardcoded credentials
  if (username === adminUser.username && password === adminUser.password) {
    // If the credentials match, create a JWT token with a secret key and set it as a response header
    const token = jwt.sign({ username }, config.jwt.secretJwt);
    return successFormatResponse({ token: token }, 'Login successful');
  } else {
    return errorMessageFormated({ message: 'Invalid credentials', code: 401 });
  }
};

export default controller;
