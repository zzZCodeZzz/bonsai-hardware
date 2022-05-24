import { Inject, Injectable } from '@nestjs/common';
import { SoilMoistureService } from '../sensors/soil-moisture/soil-moisture.service';
import { PumpService } from '../pumps/pump.service';
import { Cron } from '@nestjs/schedule';
import { FirebaseService } from '../firebase/firebase.service';
import { ClientProxy } from '@nestjs/microservices';
import { Timestamp } from 'firebase/firestore';

@Injectable()
export class IrrigationService {
  constructor(
    private soilMoistureService: SoilMoistureService,
    private pumpService: PumpService,
    private firebaseService: FirebaseService,
    @Inject('MQTT_SERVICE') private client: ClientProxy,
  ) {}

  // At every 30th minute.
  @Cron('*/30 * * * *')
  public async irrigate() {
    const percentage =
      this.soilMoistureService.getPercentageFromRingBuffer('zitronen-melisse');

    if (percentage < 81) {
      await this.client.emit('/pump/zitronen-melisse', {
        mode: 'start',
        seconds: 3,
      });
    }

    await this.firebaseService.safeToFirestore('soilMoisture', {
      percentage,
      timestamp: Timestamp.now(),
    });
  }
}
