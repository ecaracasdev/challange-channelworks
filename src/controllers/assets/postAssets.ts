import { Request, Response } from 'express';
import AssetModel, { IAsset } from '../../models/assets';

const controller = async (req: Request, res: Response): Promise<void> => {
  try {
    const { brand, model, type }: IAsset = req.body;
    const newAsset = new AssetModel({ brand, model, type });
    const savedAsset = await newAsset.save();
    res
      .status(201)
      .json({ message: 'Asset added successfully', asset: savedAsset });
  } catch (error: any) {
    console.error(`Error creating new asset: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export default controller;
