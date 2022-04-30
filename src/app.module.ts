import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PowerOutletsModule } from './power-outlets/power-outlets.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [PowerOutletsModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
