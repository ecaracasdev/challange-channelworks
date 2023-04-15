export interface License {
  id: string | number;
  software: string;
}

// Sample data for the licenses
export const licenses: License[] = [
  { id: '1', software: 'amazon' },
  { id: '2', software: 'azure' },
];
