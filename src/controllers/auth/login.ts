import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const adminUser = {
  username: 'admin',
  password: 'password',
};

const controller = (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Check if the username and password match the hardcoded credentials
  if (username === adminUser.username && password === adminUser.password) {
    // If the credentials match, create a JWT token with a secret key and set it as a response header
    const token = jwt.sign({ username }, 'secretKey');
    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } else {
    // If the credentials don't match, send an error message
    res.status(401).json({
      message: 'Invalid credentials',
    });
  }
};

export default controller;
