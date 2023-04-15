import { Request, Response } from 'express';
import { AssetType, Asset, assets } from '../../models/assets';

const controller = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = assets.findIndex((asset) => asset.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Asset not found' });
  }
  assets.splice(index, 1);
  res.json({ message: 'Asset deleted successfully' });
};

export default controller;
