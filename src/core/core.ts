import { Request, Response, NextFunction } from 'express';

/**
 * Returns a middleware function that wraps a controller function and handles errors
 * thrown by it.
 *
 * @param {function} controller - The controller function to wrap
 * @returns {function} The new middleware function
 */
export const catcher =
  (controller: (req: Request, res: Response) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await controller(req, res);
      res.status(200).json(data);
    } catch (error: any) {
      console.error(error);
      res.status(error.statusCode || 500).json(error);
    }
  };

/**
 * Formats an error message and code for use in an error response.
 *
 * @param {Error} error - The error to format
 * @returns {object} The formatted error message and code
 */
export const errorMessageFormated = (error: any) => {
  return {
    message: error.message,
    code: error.code || 'UNKNOWN_ERROR',
  };
};

/**
 * Formats a success message and data for use in a success response.
 *
 * @param {any} data - The data to send in the success response
 * @param {string} message - The message to send in the success response
 * @returns {object} The formatted success message and data
 */
export const successFormatResponse = (data: any, message?: string) => {
  return {
    data,
    message: message || 'Success',
  };
};
