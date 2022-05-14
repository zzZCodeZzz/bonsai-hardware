import { Injectable } from '@nestjs/common';
import { Gpio } from 'onoff';

@Injectable()
export class PumpService {
  public turnPump(state: 'on' | 'off') {
    console.log('pump', state);
    const pump = new Gpio(17, 'out');
    pump.writeSync(state === 'on' ? 1 : 0);
  }
}
