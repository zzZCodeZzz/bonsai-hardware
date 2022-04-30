import { Module } from '@nestjs/common';
import { PowerOutletsService } from './powerOutlets.service';

@Module({
  providers: [PowerOutletsService],
})
export class PowerOutletsModule {}
