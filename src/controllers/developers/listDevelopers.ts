import { Request, Response } from 'express';
import Developer, { IDeveloper } from '../../models/developers';
import { errorMessageFormated, successFormatResponse } from '../../core/core';

type response = {
  developers: IDeveloper[];
};

const getResponse = (developers: IDeveloper[]): response => {
  return {
    developers,
  };
};

const controller = async (req: Request, res: Response) => {
  const developers = await Developer.find({})
    .populate('assets', '_id brand model type')
    .populate('licenses', '_id software');
    

  if (developers.length === 0)
    return successFormatResponse({developers:[]},'create some developers');
    
  const response: response = getResponse(developers);
  return successFormatResponse(response, 'list of developers');
};

export default controller;
