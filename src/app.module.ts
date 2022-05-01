import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PowerOutletsModule } from './power-outlets/power-outlets.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TemperatureMoistureModule } from './sensors/temperature-moisture/temperature-moisture.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirebaseModule,
    PowerOutletsModule,
    TemperatureMoistureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
