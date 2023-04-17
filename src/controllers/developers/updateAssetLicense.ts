import { Request, Response } from 'express';
import Developer from '../../models/developers';
import Asset from '../../models/assets';
import License from '../../models/licenses';
import { isValidObjectId } from '../../utils/validation';
import { successFormatResponse, errorMessageFormated } from '../../core/core';

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
  const { id } = req.params;
  const { type, operation, value } = req.body as OperationRequestBody;

  if (!isValidObjectId(id)) {
    return errorMessageFormated({ message: 'Invalid Asset ID', code: 400 });
  }

  const developer = await Developer.findOne({ _id: id, active: true });
  if (!developer) {
    return errorMessageFormated({
      message: 'Active developer not found',
      code: 400,
    });
  }

  if (type === 'asset') {
    for (const asset of value) {
      const foundAsset = await Asset.findOne({ _id: asset.assetId });
      if (!foundAsset) {
        return errorMessageFormated({ message: 'Asset not found', code: 400 });
      }
    }
    switch (operation) {
      case 'add':
        const assetsToAdd = value.filter(
          (asset) => !developer.assets.includes(asset.assetId)
        );
        if (assetsToAdd.length === 0) {
          return successFormatResponse('Developer already has these assets');
        }
        developer.assets.push(...value.map((asset) => asset.assetId));
        break;
      case 'remove':
        const assetToRemoveId = value[0].assetId;
        const assetIndex = developer.assets.findIndex(
          (asset) => asset.toString() === assetToRemoveId
        );
        if (assetIndex === -1) {
          return successFormatResponse(
            assetToRemoveId,
            `Asset ${assetToRemoveId} not found for developer`
          );
        }
        developer.assets.splice(assetIndex, 1);
        break;
      default:
        return errorMessageFormated({
          message: 'Invalid operation type',
          code: 400,
        });
    }
  } else if (type === 'license') {
    for (const license of value) {
      const foundLicense = await License.findOne({ _id: license.licenseId });
      if (!foundLicense) {
        return errorMessageFormated({
          message: 'License not found',
          code: 400,
        });
      }
    }
    switch (operation) {
      case 'add':
        const licenseToAdd = value.filter(
          (license) => !developer.licenses.includes(license.licenseId)
        );
        if (licenseToAdd.length === 0) {
          return successFormatResponse('Developer already has these licenses');
        }
        developer.licenses.push(...value.map((license) => license.licenseId));
        break;
      case 'remove':
        const licenseToRemoveId = value[0].licenseId;
        const licenseIndex = developer.licenses.findIndex(
          (license) => license.toString() === licenseToRemoveId
        );
        if (licenseIndex === -1) {
          return successFormatResponse(
            licenseToRemoveId,
            `License ${licenseToRemoveId} not found for developer ${id}`
          );
        }
        developer.licenses.splice(licenseIndex, 1);
        break;
      default:
        return errorMessageFormated({
          message: 'Invalid operation type',
          code: 400,
        });
    }
  } else {
    return errorMessageFormated({ message: 'Invalid type', code: 400 });
  }

  await developer.save();

  return successFormatResponse(
    developer,
    `Developer ${type}s updated successfully`
  );
};

export default controller;
