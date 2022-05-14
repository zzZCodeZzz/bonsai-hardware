import * as mcpadc from 'mcp-spi-adc';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { delay } from '../../utils';

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

  public async getPercentage(): Promise<number> {
    console.log('sensor', this.sensor);
    const results: number[] = [];
    for (let i = 0; i < 5; i++) {
      const percentage = await this.sensor.readPercentage();
      console.log('percentage', percentage);
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
