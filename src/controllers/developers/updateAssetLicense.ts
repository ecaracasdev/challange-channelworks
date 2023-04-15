import { Request, Response } from 'express';
import { Developer, developers } from '../../models/developers';

const controller = (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, operation, value } = req.body;
  const developer = developers.find((d) => d.id === id);

  if (!developer) {
    return res.status(404).json({ message: 'Developer not found' });
  }

  if (type === 'asset') {
    if (operation === 'add') {
      developer.assets.push(value);
    } else if (operation === 'remove') {
      const assetIndex = developer.assets.findIndex((a) => a.id === value);
      if (assetIndex !== -1) {
        developer.assets.splice(assetIndex, 1);
      }
    } else if (operation === 'replace') {
      developer.assets = value;
    }
  } else if (type === 'license') {
    if (operation === 'add') {
      developer.licenses.push(value);
    } else if (operation === 'remove') {
      const licenseIndex = developer.licenses.findIndex((l) => l.id === value);
      if (licenseIndex !== -1) {
        developer.licenses.splice(licenseIndex, 1);
      }
    } else if (operation === 'replace') {
      developer.licenses = value;
    }
  } else {
    return res.status(400).json({ message: 'Invalid type' });
  }

  return res.status(200).json({
    message: `Developer ${type}s updated successfully`,
    developer,
  });
};

export default controller;
