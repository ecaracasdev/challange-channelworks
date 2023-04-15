import { Request, Response } from 'express';
import { License, licenses } from '../../models/licenses';

const controller = (req: Request, res: Response) => {
  const { id, software }: License = req.body;
  const newLicense: License = { id, software };
  licenses.push(newLicense);
  res
    .status(201)
    .json({ message: 'license added successfully', license: newLicense });
};

export default controller;
