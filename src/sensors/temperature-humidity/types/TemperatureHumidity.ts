import { Timestamp } from 'firebase/firestore';

export interface TemperatureHumidity {
  temperature: number;
  humidity: number;
  timestamp: Timestamp;
}
