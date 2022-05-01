import { Injectable } from '@nestjs/common';
import * as dht22sensorLib from 'node-dht-sensor';
import { FirebaseService } from '../../firebase/firebase.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TemperatureMoistureService {
  constructor(private firebaseService: FirebaseService) {}

  @Cron('* * * * *')
  private async readSensor(): Promise<void> {
    const readout = dht22sensorLib.read(22, 4);

    console.log(
      `[readout] ` +
        `temperature: ${readout.temperature.toFixed(1)}°C, ` +
        `humidity: ${readout.humidity.toFixed(1)}%`,
    );

    await this.firebaseService.safeToFirestore('Dht-22', readout);
  }
}
