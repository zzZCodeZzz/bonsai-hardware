import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Client } from 'tplink-smarthome-api';

// used this package to control HS100
// https://github.com/plasticrake/tplink-smarthome-api

@Injectable()
export class PowerOutletsService {
  static readonly DeviceIp = '192.168.2.109';
  private hs100client = new Client();

  private getDevice(host = PowerOutletsService.DeviceIp) {
    return this.hs100client.getDevice({ host });
  }

  public async setPowerState(onOff: boolean) {
    const device = await this.getDevice();
    await device.setPowerState(onOff);
  }

  // Every Hour.
  @Cron('0 * * * *')
  private async healthCheck() {
    const device = await this.getDevice();
    try {
      const sysInfo = await device.getSysInfo();
      console.log('HealthCheck - 192.168.2.109', sysInfo);
    } catch (e) {
      console.log('Device not reachable 192.168.2.109', e);
    }
  }

  // At 07:00.
  @Cron('0 7 * * *')
  public turnOn() {
    return this.setPowerState(true);
  }

  // At 19:00.
  @Cron('0 19 * * *')
  public turnOff() {
    return this.setPowerState(false);
  }
}
