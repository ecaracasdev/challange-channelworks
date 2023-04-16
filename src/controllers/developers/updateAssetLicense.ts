import { Request, Response } from 'express';
import Developer from '../../models/developers';
import Asset from '../../models/assets';
import License from '../../models/licenses';
import { isValidObjectId } from '../../utils/validation';

interface OperationValue {
  assetId: string;
  licenseId: string;
}

interface OperationRequestBody {
  type: 'asset';
  operation: 'add' | 'remove';
  value: OperationValue[];
}

const controller = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, operation, value } = req.body as OperationRequestBody;

    if (!isValidObjectId(id)) {
      // validate the id parameter
      return res.status(400).json({ error: 'Invalid Asset ID' });
    }

    const developer = await Developer.findOne({ _id: id, active: true });
    if (!developer) {
      throw new Error('Active developer not found');
    }

    if (type === 'asset') {
      for (const asset of value) {
        const foundAsset = await Asset.findOne({ _id: asset.assetId });
        if (!foundAsset) {
          return res.status(400).json({ message: 'Asset not found' });
        }
      }
      switch (operation) {
        case 'add':
          const assetsToAdd = value.filter(
            (asset) => !developer.assets.includes(asset.assetId)
          );
          if (assetsToAdd.length === 0) {
            return res.status(200).json({
              message: 'Developer already has these assets',
            });
          }
          developer.assets.push(...value.map((asset) => asset.assetId));
          break;
        case 'remove':
          const assetToRemoveId = value[0].assetId;
          const assetIndex = developer.assets.findIndex(
            (asset) => asset.toString() === assetToRemoveId
          );
          if (assetIndex === -1) {
            return res.status(200).json({
              message: `Asset ${assetToRemoveId} not found for developer ${id}`,
            });
          }
          developer.assets.splice(assetIndex, 1);
          break;
        default:
          return res.status(400).json({ message: 'Invalid operation type' });
      }
    } else if (type === 'license') {
      for (const license of value) {
        const foundLicense = await License.findOne({ _id: license.licenseId });
        if (!foundLicense) {
          return res.status(400).json({ message: 'License not found' });
        }
      }
      switch (operation) {
        case 'add':
          const licenseToAdd = value.filter(
            (license) => !developer.licenses.includes(license.licenseId)
          );
          if (licenseToAdd.length === 0) {
            return res.status(200).json({
              message: 'Developer already has these licenses',
            });
          }
          developer.licenses.push(...value.map((license) => license.licenseId));
          break;
        case 'remove':
          const licenseToRemoveId = value[0].licenseId;
          const licenseIndex = developer.licenses.findIndex(
            (license) => license.toString() === licenseToRemoveId
          );
          if (licenseIndex === -1) {
            return res.status(200).json({
              message: `License ${licenseToRemoveId} not found for developer ${id}`,
            });
          }
          developer.licenses.splice(licenseIndex, 1);
          break;
        default:
          return res.status(400).json({ message: 'Invalid operation type' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid type' });
    }

    await developer.save();

    return res.status(200).json({
      message: `Developer ${type}s updated successfully`,
      developer,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export default controller;
