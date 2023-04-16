import { Request, Response } from 'express';
import LicenseModel from '../../models/licenses';

const controller = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const license = await LicenseModel.findById(id);

    if (!license) {
      return res.status(404).json({ error: 'License not found' });
    }
    const result = await LicenseModel.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      res.json({ message: 'License deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting license', error });
  }
};

export default controller;
