import mongoose, { Document }  from 'mongoose';

// assets.ts
export type AssetType = 'laptop' | 'keyboard' | 'mouse' | 'headset';

export interface IAsset extends Document {
  brand: string;
  model: string;
  type: AssetType;
}

export const assetSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AssetModel = mongoose.model<IAsset>('Asset', assetSchema);

export default AssetModel;
