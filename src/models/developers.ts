import mongoose from 'mongoose';

export interface IDeveloper extends mongoose.Document {
  id: string | number;
  fullname: string;
  active: boolean;
  assets: string[];
  licenses: string[];
}

const DeveloperSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    active: { type: Boolean, default: true },
    assets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asset' }],
    licenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'License' }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const DeveloperModel = mongoose.model<IDeveloper>('Developer', DeveloperSchema);

export default DeveloperModel;
