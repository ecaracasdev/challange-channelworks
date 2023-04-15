import { Request, Response } from 'express';
import { AssetType, Asset, assets } from '../../models/assets';

const controller = (req: Request, res: Response) => {
  const { id, brand, model, type }: Asset = req.body;
  const newAsset: Asset = { id, brand, model, type };
  assets.push(newAsset);
  res
    .status(201)
    .json({ message: 'Asset added successfully', asset: newAsset });
};

export default controller;
