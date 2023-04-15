import { Request, Response } from 'express';
import { developers } from '../../models/developers';

const controller = (req: Request, res: Response) => {
  developers;
  res.status(200).json({
    developers,
  });
};

export default controller;
