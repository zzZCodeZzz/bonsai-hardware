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

    await this.firebaseService.safeToFirestore('soilMoisture', {
      percentage: soilMoisture,
      timestamp: Timestamp.now(),
    });

    if (soilMoisture < 75) {
      this.pumpService.turnPump('on');
      await delay(3000);
      this.pumpService.turnPump('off');
    }
  }
}
