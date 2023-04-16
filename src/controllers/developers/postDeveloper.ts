import { Request, Response } from 'express';
import Developer from '../../models/developers';

const controller = async (req: Request, res: Response) => {
  try {
    const { id, fullname, active, assets = [], licenses = [] } = req.body;
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
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export default controller;
