import { Module } from '@nestjs/common';
import { IrrigationService } from './irrigation.service';

@Module({
  providers: [IrrigationService],
})
export class IrrigationModule {}
