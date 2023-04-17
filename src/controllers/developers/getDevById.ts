import { Request, Response } from 'express';
import Developer, { IDeveloper } from '../../models/developers';
import { errorMessageFormated, successFormatResponse } from '../../core/core';
import { isValidObjectId } from '../../utils/validation';

const parameterValidation = (id: string, property: any) => {
  if (!isValidObjectId(id)) {
    return errorMessageFormated({
      message: 'Invalid Asset ID',
      code: 400,
    });
  }

  if (property) {
    const validQueries = ['', 'assets', 'licenses'];
    if (!validQueries.includes(property)) {
      return errorMessageFormated({
        message: 'Invalid property parameter',
        code: 400,
      });
    }
  }
};

const controller = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { property } = req.query;

  // Validate the request parameters
  const idValidationResult = parameterValidation(id, property);
  if (idValidationResult) return idValidationResult;

  const developer = await Developer.findById(id)
    .populate('assets')
    .populate('licenses');
  if (!developer) return errorMessageFormated('error');

  // Return the full developer object if query parameter is empty
  if (!property) {
    return successFormatResponse(developer, 'Developer');
  }

  // Return either assets or licenses depending on the query parameter
  if (property === 'assets') {
    return successFormatResponse(
      { assets: developer.assets },
      'Developer Assets'
    );
  } else if (property === 'licenses') {
    return successFormatResponse(
      { licenses: developer.licenses },
      'Developer Licenses'
    );
  }
};

export default controller;
