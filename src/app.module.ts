import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PowerOutletsModule } from './power-outlets/power-outlets.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TemperatureHumidityModule } from './sensors/temperature-humidity/temperature-humidity.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';
import { SoilMoistureModule } from './sensors/soil-moisture/soil-moisture.module';
import { PumpModule } from './pumps/pump.module';
import { IrrigationModule } from './irrigation/irrigation.module';
import { IrrigationService } from './irrigation/irrigation.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://localhost:1883',
        },
      },
    ]),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirebaseModule,
    PowerOutletsModule,
    TemperatureHumidityModule,
    SoilMoistureModule,
    PumpModule,
    IrrigationModule,
  ],
  controllers: [AppController],
  providers: [AppService, IrrigationService],
})
export class AppModule {}
