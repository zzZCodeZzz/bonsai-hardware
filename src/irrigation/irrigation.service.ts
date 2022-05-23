import { Injectable } from '@nestjs/common';
import { SoilMoistureService } from '../sensors/soil-moisture/soil-moisture.service';
import { PumpService } from '../pumps/pump.service';
import { delay } from '../utils';
import { Cron } from '@nestjs/schedule';
import { FirebaseService } from '../firebase/firebase.service';
import { Timestamp } from 'firebase/firestore';

@Injectable()
export class IrrigationService {
  constructor(
    private soilMoistureService: SoilMoistureService,
    private pumpService: PumpService,
    private firebaseService: FirebaseService,
  ) {}

  // At every 30th minute.
  @Cron('*/30 * * * *')
  public async irrigate() {
    const soilMoisture = await this.soilMoistureService.getPercentage();

    const timestamp = Timestamp.now();

    if (soilMoisture < 81) {
      this.pumpService.turnPump('on');
      await delay(3000);
      this.pumpService.turnPump('off');
      await delay(3000);
      const moistAfterWatering = await this.soilMoistureService.getPercentage();
      await this.firebaseService.safeToFirestore('soilMoisture', {
        percentage: moistAfterWatering,
        timestamp,
      });
    } else {
      await this.firebaseService.safeToFirestore('soilMoisture', {
        percentage: soilMoisture,
        timestamp,
      });
    }
  }

  // At every 30th minute.
  @Cron('*/1 * * * *')
  public async newIrrigate() {
    const percentage =
      this.soilMoistureService.getPercentageFromRingBuffer('zitronen-melisse');

    /* if (percentage < 50) {
      this.client.emit('/pump/zitronen-melisse', {
        mode: 'start',
        seconds: 3,
      });
    }*/
  }
}
