import { Request, Response } from 'express';
import LicenseModel from '../../models/licenses';

const controller = async (req: Request, res: Response) => {
  try {
    const licenses = await LicenseModel.find();
    res.json({ licenses });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving licenses', error });
  }
};

export default controller;