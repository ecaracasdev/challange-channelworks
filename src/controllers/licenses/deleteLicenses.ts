import { Request, Response } from 'express';
import { licenses } from '../../models/licenses';

const controller = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = licenses.findIndex((license) => license.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'license not found' });
  }
  licenses.splice(index, 1);
  res.json({ message: 'license deleted successfully' });
};

export default controller;
