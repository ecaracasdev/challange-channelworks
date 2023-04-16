import { Request, Response } from 'express';
import AssetModel from '../../models/assets';

const controller = async (req: Request, res: Response) => {
  try {
    const assets = await AssetModel.find().lean().exec();

    res.json({ assets });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to retrieve assets' });
  }
};

export default controller;