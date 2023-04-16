import mongoose, { Document } from 'mongoose';

export interface ILicense extends Document {
  software: string;
}

export const licenseSchema = new mongoose.Schema(
  {
    software: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const LicenseModel = mongoose.model<ILicense>('License', licenseSchema);

export default LicenseModel;
