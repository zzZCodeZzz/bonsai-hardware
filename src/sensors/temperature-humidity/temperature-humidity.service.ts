import { Injectable } from '@nestjs/common';
import * as dht22sensorLib from 'node-dht-sensor';
import { FirebaseService } from '../../firebase/firebase.service';
import { Cron } from '@nestjs/schedule';
import { Timestamp } from 'firebase/firestore';
import { TemperatureHumidity } from './types/TemperatureHumidity';
import { SensorType } from 'node-dht-sensor';

// using this sensor npm module https://www.npmjs.com/package/node-dht-sensor

@Injectable()
export class TemperatureHumidityService {
  static readonly SensorName = 'Dht-22';
  static readonly SensorType: SensorType = 22;
  static readonly SensorPin: number = 26;

  constructor(private firebaseService: FirebaseService) {}

  // At every 30th minute.
  @Cron('*/30 * * * *')
  private async recordSensorLog(): Promise<void> {
    const temperatureHumidity = await this.readSensor();
    await this.writeToFirestore(temperatureHumidity);
  }

  public async readSensor(): Promise<TemperatureHumidity> {
    const readout = await dht22sensorLib.read(
      TemperatureHumidityService.SensorType,
      TemperatureHumidityService.SensorPin,
    );
    return {
      temperature: Math.round(readout.temperature * 10) / 10,
      humidity: Math.round(readout.humidity * 10) / 10,
      timestamp: Timestamp.now(),
    };
  }

  private writeToFirestore(value: TemperatureHumidity) {
    return this.firebaseService.safeToFirestore(
      TemperatureHumidityService.SensorName,
      value,
    );
  }
}
