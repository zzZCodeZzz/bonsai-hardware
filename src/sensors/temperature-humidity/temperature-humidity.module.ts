import { Module } from '@nestjs/common';
import { TemperatureHumidityService } from './temperature-humidity.service';
import { FirebaseService } from '../../firebase/firebase.service';

@Module({
  providers: [TemperatureHumidityService, FirebaseService],
})
export class TemperatureHumidityModule {}
