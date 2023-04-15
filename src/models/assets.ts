// assets.ts
export type AssetType = 'laptop' | 'keyboard' | 'mouse' | 'headset';

export interface Asset {
  id: string | number;
  brand: string;
  model: string;
  type: AssetType;
}

// Sample data for the assets
export const assets: Asset[] = [
  { id: '1', brand: 'Dell', model: 'Latitude 7400', type: 'laptop' },
  { id: '2', brand: 'Logitech', model: 'K840', type: 'keyboard' },
  { id: '3', brand: 'Logitech', model: 'MX Master 3', type: 'mouse' },
  { id: '4', brand: 'Bose', model: 'QuietComfort 35 II', type: 'headset' },
];