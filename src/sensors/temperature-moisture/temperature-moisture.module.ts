import { Module } from '@nestjs/common';
import { TemperatureMoistureService } from './temperature-moisture.service';

@Module({
  providers: [TemperatureMoistureService],
})
export class TemperatureMoistureModule {}
