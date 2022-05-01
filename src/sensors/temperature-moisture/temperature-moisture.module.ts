import { Module } from '@nestjs/common';
import { TemperatureMoistureService } from './temperature-moisture.service';
import { FirebaseService } from '../../firebase/firebase.service';

@Module({
  providers: [TemperatureMoistureService, FirebaseService],
})
export class TemperatureMoistureModule {}
