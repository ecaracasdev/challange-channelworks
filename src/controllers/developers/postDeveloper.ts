import { Request, Response } from 'express';
import { Developer, developers } from '../../models/developers';

const controller = (req: Request, res: Response) => {
  const { id, fullname, active, assets = [], licenses = [] } = req.body;
  const developer: Developer = { id, fullname, active, assets, licenses };
  developers.push(developer);
  res.status(201).json({ message: 'Developer added successfully', developer });
};

export default controller;
