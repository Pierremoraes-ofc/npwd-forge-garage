export type VehicleType = 'car' | 'bike' | 'boat' | 'aircraft';

export interface GarageVehicle {
  fullname: string;
  brand: string;
  model: string;
  spawnName: string;
  plate: string;
  garage: string;
  state: string;
  stateCode: 'out' | 'garaged' | 'insurance' | 'impounded' | 'unknown';
  fuel: number;
  engine: number;
  body: number;
  paymentsleft?: number;
  disableTracking: boolean;
  type: VehicleType;
}

export interface NuiResponse<T = unknown> {
  status: 'ok' | 'error';
  message?: string;
  data: T;
}