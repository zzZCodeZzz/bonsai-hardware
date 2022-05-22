import { Module } from '@nestjs/common';
import { FirebaseService } from '../../firebase/firebase.service';
import { SoilMoistureService } from './soil-moisture.service';
import { SoilMoistureController } from './soil-moisture.controller';

@Module({
  providers: [SoilMoistureService, FirebaseService],
  exports: [SoilMoistureService],
  controllers: [SoilMoistureController],
})
export class SoilMoistureModule {}
