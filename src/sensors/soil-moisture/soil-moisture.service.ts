import * as mcpadc from 'mcp-spi-adc';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { FirebaseService } from '../../firebase/firebase.service';
import { delay } from '../../utils';

const tempSensor = mcpadc.openMcp3008(0, (err) => {
  if (err) throw err;
  let currentMin = 1000;
  let currentMax = 0;

  setInterval((_) => {
    tempSensor.read((err, reading) => {
      if (err) throw err;
      console.log('reading', reading);
      currentMin = Math.min(currentMin, reading.rawValue);
      currentMax = Math.max(currentMax, reading.rawValue);
      console.log('min/max', currentMin, currentMax);
      const rawPercentage = ((reading.rawValue - 437) / 4.17 - 100) * -1;
      const percentage = rawPercentage < 1 ? 0 : rawPercentage;
      console.log('percentage', percentage);
    });
  }, 1000);
});

class SoilMoistureSensor {
  constructor(private sensor: any) {}

  static async Create() {
    return new Promise<SoilMoistureSensor>((resolve, reject) => {
      const sensorResult = mcpadc.openMcp3008(0, (err) => {
        if (err) {
          reject(err);
        }
        resolve(new SoilMoistureSensor(sensorResult));
      });
    });
  }

  public async readPercentage() {
    return new Promise<number>((resolve, reject) => {
      this.sensor.read((err, reading) => {
        if (err) {
          reject(err);
        }
        const rawPercentage = ((reading.rawValue - 437) / 4.17 - 100) * -1;
        const percentage = rawPercentage < 1 ? 0 : rawPercentage;
        resolve(percentage);
      });
    });
  }
}

@Injectable()
export class SoilMoistureService implements OnModuleInit {
  private sensor: SoilMoistureSensor;

  constructor() {}

  public async getPercentage(): Promise<number> {
    const results: number[] = [];
    for (let i = 0; i < 99; i++) {
      const percentage = await this.sensor.readPercentage();
      results.push(percentage);
      await delay(1000);
    }
    const sum = results.reduce((acc, cur) => cur + acc, 0);
    return sum / results.length;
  }

  async onModuleInit() {
    this.sensor = await SoilMoistureSensor.Create();
  }
}
