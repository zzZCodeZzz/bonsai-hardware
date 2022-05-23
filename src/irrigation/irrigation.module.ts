import { Module } from '@nestjs/common';
import { IrrigationService } from './irrigation.service';
import { PumpService } from '../pumps/pump.service';
import { SoilMoistureService } from '../sensors/soil-moisture/soil-moisture.service';
import { FirebaseService } from '../firebase/firebase.service';

@Module({
  providers: [
    IrrigationService,
    PumpService,
    SoilMoistureService,
    FirebaseService,
  ],
})
export class IrrigationModule {}
