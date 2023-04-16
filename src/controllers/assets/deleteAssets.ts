import { Request, Response } from 'express';
import AssetModel from '../../models/assets';
import { isValidObjectId } from '../../utils/validation';

const controller = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    // validate the id parameter
    return res.status(400).json({ error: 'Invalid Asset ID' });
  }
  try {
    const deletedAsset = await AssetModel.findByIdAndDelete(id);

    if (!deletedAsset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    res.json({ message: 'Asset deleted successfully' });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to delete asset' });
  }
};

export default controller;
