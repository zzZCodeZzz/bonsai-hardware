import * as mcpadc from 'mcp-spi-adc';

export class SoilMoistureSensor {
  constructor(private sensor: any) {}

  static async Create(): Promise<SoilMoistureSensor> {
    return new Promise<SoilMoistureSensor>((resolve, reject) => {
      const sensorResult = mcpadc.openMcp3008(0, (err) => {
        if (err) {
          reject(err);
        }
        resolve(new SoilMoistureSensor(sensorResult));
      });
    });
  }

  public async readPercentage(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.sensor.read((err: any, reading: { rawValue: number }) => {
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
