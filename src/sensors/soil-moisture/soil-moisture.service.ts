import { Injectable, OnModuleInit } from '@nestjs/common';
import { delay } from '../../utils';
import { SoilMoistureSensor } from './SoilMoistureSensor';

@Injectable()
export class SoilMoistureService implements OnModuleInit {
  private sensor: SoilMoistureSensor;

  public async getPercentage(): Promise<number> {
    const results: number[] = [];
    for (let i = 0; i < 5; i++) {
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
