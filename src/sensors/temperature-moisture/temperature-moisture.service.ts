import { Injectable } from '@nestjs/common';
import * as dht22sensorLib from 'node-dht-sensor';
import { FirebaseService } from '../../firebase/firebase.service';
import { Cron } from '@nestjs/schedule';
import { Timestamp } from 'firebase/firestore';

@Injectable()
export class TemperatureMoistureService {
  constructor(private firebaseService: FirebaseService) {}

  @Cron('* * * * *')
  private async readSensor(): Promise<void> {
    const readout = await dht22sensorLib.read(22, 4);

    const temperature = readout.temperature.toFixed(1);
    const humidity = readout.humidity.toFixed(1);

    console.log(
      `[readout] ` +
        `temperature: ${temperature}°C, ` +
        `humidity: ${humidity}%`,
    );

    await this.firebaseService.safeToFirestore('test', {
      temperature,
      humidity,
      timeStamp: Timestamp.now(),
    });
  }
}
