import { Request, Response } from 'express';
import { Developer, developers } from '../../models/developers';

const controller = (req: Request, res: Response) => {
  const id = req.params.id;
  const index = developers.findIndex((developer) => developer.id === id);
  if (index !== -1) {
    developers[index].active = false;

    // Remove developer's assets and licenses
    developers[index].assets = [];
    developers[index].licenses = [];

    res.json({
      message:
        'Developer set as inactive and their assets and licenses removed',
      developer: developers[index],
    });
  } else {
    res.status(404).json({ error: 'Developer not found' });
  }
};

export default controller;
