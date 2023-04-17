import { Request, Response } from 'express';
import Developer from '../../models/developers';
import Asset from '../../models/assets';
import License from '../../models/licenses';
import mongoose from 'mongoose';
import { isValidObjectId } from '../../utils/validation';
import { errorMessageFormated, successFormatResponse } from '../../core/core';

const bodyValidation = async (body: any) => {
  const { assets = [], licenses = [] } = body;
  const assetIds = assets.filter(Boolean);
  const isValidAsset = assetIds.every((assetId: string) =>
    isValidObjectId(assetId)
  );

  if (!isValidAsset) {
    return errorMessageFormated({ error: 'Invalid assetId', code: 400 });
  }
  if (assetIds.length) {
    const assetsExist =
      (await Asset.countDocuments({ _id: { $in: assetIds } })) ===
      assetIds.length;
    if (!assetsExist) {
      return errorMessageFormated({
        error: 'One or more assets do not exist',
        code: 400,
      });
    }
  }

  // Check if all the license IDs exist
  const licenseIds = licenses.filter(Boolean);
  const isValidLicense = licenseIds.every((licenseId: string) =>
    mongoose.Types.ObjectId.isValid(licenseId)
  );

  if (!isValidLicense) {
    return errorMessageFormated({ error: 'Invalid licenseId', code: 400 });
  }

  if (licenseIds.length) {
    const licensesExist =
      (await License.countDocuments({ _id: { $in: licenseIds } })) ===
      licenseIds.length;
    if (!licensesExist) {
      return errorMessageFormated({
        error: 'One or more licenses do not exist',
        code: 400,
      });
    }
  }
};

const developerController = async (req: Request, res: Response) => {
  const { id, fullname, active, assets = [], licenses = [] } = req.body;

  // Validate the request body
  const validationResult = await bodyValidation(req.body);
  if (validationResult) return validationResult;

  const developer = await Developer.create({
    id,
    fullname,
    active,
    assets,
    licenses,
  });

  return successFormatResponse(developer, 'Developer added successfully');
};

export default developerController;
