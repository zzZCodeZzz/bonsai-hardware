import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Client } from 'tplink-smarthome-api';

@Injectable()
export class PowerOutletsService {
  private hs100client = new Client();

  private async getDevice(host: string) {
    const device = await this.hs100client.getDevice({ host });
    const sysInfo = await device.getSysInfo();
    console.log('sysInfo: ', sysInfo);
    return device;
  }

  private async setPowerState(value: boolean) {
    const device = await this.getDevice('192.168.2.109');
    await device.setPowerState(value);
  }

  /*@Cron('0 7 * * *')
  turnOn() {
    return this.setPowerState(true);
  }

  @Cron('0 19 * * *')
  turnOff() {
    return this.setPowerState(false);
  }*/

  @Cron('* * * * *')
  test() {
    return this.setPowerState(true);
  }
}
