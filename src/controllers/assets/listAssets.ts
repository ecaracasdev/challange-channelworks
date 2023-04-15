import { Request, Response } from 'express';
import { AssetType, Asset, assets } from '../../models/assets';

const controller = (req: Request, res: Response) => {
  res.json({ assets });
};

export default controller;
