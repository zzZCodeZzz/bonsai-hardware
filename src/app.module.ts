import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PowerOutletsModule } from './power-outlets/power-outlets.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TemperatureMoistureModule } from './sensors/temperature-moisture/temperature-moisture.module';

@Module({
  imports: [
    PowerOutletsModule,
    TemperatureMoistureModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
