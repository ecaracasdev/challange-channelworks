import mongoose from 'mongoose';

/**
 * Check if an ID parameter is a valid Mongoose ObjectId
 * @param id - the ID parameter to be validated
 * @returns true if the ID is valid, false otherwise
 */
const isValidObjectId = (id: any): boolean =>
  mongoose.Types.ObjectId.isValid(id);

/**
 * Check if a string is empty or null
 * @param value - the string to be validated
 * @returns true if the string is empty or null, false otherwise
 */
const isEmpty = (value: string): boolean =>
  value === null || value.trim().length === 0;

/**
 * Check if a value is a string
 * @param value - the value to be validated
 * @returns true if the value is a string, false otherwise
 */
const isString = (value: any): boolean =>
  typeof value === 'string' || value instanceof String;

export { isValidObjectId, isEmpty, isString };
