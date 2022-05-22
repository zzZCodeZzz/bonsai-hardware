import { Injectable, OnModuleInit } from '@nestjs/common';
import { delay } from '../../utils';
import { SoilMoistureSensor } from './SoilMoistureSensor';
import { SoilMoistureMessage } from './SoilMoisture';
import { RingBufferMap } from '../../ring-buffer/RingBuffer';

@Injectable()
export class SoilMoistureService implements OnModuleInit {
  private sensor: SoilMoistureSensor;

  private ringBuffers = new RingBufferMap<SoilMoistureMessage>(
    ['zitronen-melisse'],
    100,
  );

  async onModuleInit() {
    this.sensor = await SoilMoistureSensor.Create();
  }

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

  queToRingBuffer(message: SoilMoistureMessage): void {
    this.ringBuffers.get(message.sensorId).que(message);
  }

  getMeanValueFromBuffer(bufferId: string): number {
    const ringBufferContent = this.ringBuffers.get(bufferId).getAll();
    return (
      ringBufferContent.reduce((acc, cur) => acc + cur.analogReadValue, 0) /
      ringBufferContent.length
    );
  }
}
