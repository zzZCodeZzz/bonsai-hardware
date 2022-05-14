import { Module } from '@nestjs/common';
import { FirebaseService } from '../../firebase/firebase.service';
import { SoilMoistureService } from './soil-moisture.service';

@Module({
  providers: [SoilMoistureService, FirebaseService],
  exports: [SoilMoistureService],
})
export class SoilMoistureModule {}
