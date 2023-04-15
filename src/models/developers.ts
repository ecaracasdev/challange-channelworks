import { assets, Asset } from "./assets";
import { License } from "./licenses";

export interface Developer {
  id: string | number;
  fullname: string;
  active: boolean;
  assets: Asset[];
  licenses: License[];
}

export const developers: Developer[] = [];
