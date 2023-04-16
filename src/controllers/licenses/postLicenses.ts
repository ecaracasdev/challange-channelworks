import { Request, Response } from 'express';
import License from '../../models/licenses';

const controller = async (req: Request, res: Response) => {
  try {
    const { id, software } = req.body;

    const license = new License({ id, software });
    await license.save();

    res.status(201).json({ message: 'License added successfully', license });
  } catch (error) {
    res.status(500).json({ message: 'Error adding license', error });
  }
};

export default controller;
