import { Injectable } from '@nestjs/common';
import { SoilMoistureService } from '../sensors/soil-moisture/soil-moisture.service';
import { PumpService } from '../pumps/pump.service';
import { delay } from '../utils';

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

    if (soilMoisture < 45) {
      this.pumpService.turnPump('on');
      await delay(3000);
      this.pumpService.turnPump('off');
    }
  }
}
