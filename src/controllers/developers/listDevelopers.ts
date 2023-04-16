import { Request, Response } from 'express';
import Developer from '../../models/developers';

const controller = async (req: Request, res: Response) => {
  try {
    const developers = await Developer.find({})
      .populate('assets', '_id brand model type')
      .populate('licenses', '_id software');
    res.status(200).json({
      developers,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export default controller;
