import { Request, Response } from 'express';
import Developer from '../../models/developers';
import { isValidObjectId } from '../../utils/validation';
import { errorMessageFormated, successFormatResponse } from '../../core/core';

const controller = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return errorMessageFormated({
      message: 'Invalid Asset ID',
      code: 400,
    });
  }
  const developer = await Developer.findOneAndUpdate(
    { _id: id },
    { active: false, assets: [], licenses: [] }
  );

  if (developer) {
    return successFormatResponse(
      developer,
      'Developer set as inactive and their assets and licenses removed'
    );
  } else {
    return errorMessageFormated({
      message: 'Developer not found',
      code: 400,
    });
  }
};

export default controller;
