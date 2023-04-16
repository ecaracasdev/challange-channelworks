import { Request, Response } from 'express';
import Developer from '../../models/developers';
import { isValidObjectId } from '../../utils/validation';

const controller = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      // validate the id parameter
      return res.status(400).json({ error: 'Invalid Asset ID' });
    }
    const developer = await Developer.findOneAndUpdate(
      { _id: id },
      { active: false, assets: [], licenses: [] }
    );

    if (developer) {
      res.json({
        message:
          'Developer set as inactive and their assets and licenses removed',
        developer,
      });
    } else {
      res.status(404).json({ error: 'Developer not found' });
    }
  } catch (err) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export default controller;
