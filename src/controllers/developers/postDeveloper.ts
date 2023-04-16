import { Request, Response } from 'express';
import Developer from '../../models/developers';
import Asset from '../../models/assets';
import License from '../../models/licenses';
import mongoose from 'mongoose';
import { isValidObjectId } from '../../utils/validation';

const controller = async (req: Request, res: Response) => {
  try {
    const { id, fullname, active, assets = [], licenses = [] } = req.body;

    const assetIds = assets.filter(Boolean);
    const isValidAsset = assetIds.every((assetId: string) =>
      isValidObjectId(assetId)
    );

    if (!isValidAsset) {
      return res.status(400).json({ error: 'Invalid assetId' });
    }
    if (assetIds.length) {
      const assetsExist =
        (await Asset.countDocuments({ _id: { $in: assetIds } })) ===
        assetIds.length;
      if (!assetsExist) {
        return res.status(400).json({
          message: 'One or more assets do not exist',
        });
      }
    }

    // Check if all the license IDs exist
    const licenseIds = licenses.filter(Boolean);
    const isValidLicense = licenseIds.every((licenseId: string) =>
      mongoose.Types.ObjectId.isValid(licenseId)
    );

    if (!isValidLicense) {
      return res.status(400).json({ error: 'Invalid licenseId' });
    }

    if (licenseIds.length) {
      const licensesExist =
        (await License.countDocuments({ _id: { $in: licenseIds } })) ===
        licenseIds.length;
      if (!licensesExist) {
        return res.status(400).json({
          message: 'One or more licenses do not exist',
        });
      }
    }
    const developer = await Developer.create({
      id,
      fullname,
      active,
      assets,
      licenses,
    });
    res.status(201).json({
      message: 'Developer added successfully',
      developer,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export default controller;
