import { Injectable } from '@nestjs/common';
import { SoilMoistureService } from '../sensors/soil-moisture/soil-moisture.service';
import { PumpService } from '../pumps/pump.service';
import { Cron } from '@nestjs/schedule';
import { delay } from 'rxjs';

@Injectable()
export class IrrigationService {
  constructor(
    private soilMoistureService: SoilMoistureService,
    private pumpService: PumpService,
  ) {}

  // At every 30th minute.
  /* @Cron('*!/30 * * * *')*/
  public async irrigate() {
    const soilMoisture = await this.soilMoistureService.getPercentage();

    if (soilMoisture < 30) {
      this.pumpService.turnPump('on');
      await delay(3000);
      this.pumpService.turnPump('off');
    }
  }
}
