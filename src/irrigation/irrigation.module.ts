import { Module } from '@nestjs/common';
import { IrrigationService } from './irrigation.service';
import { PumpService } from '../pumps/pump.service';
import { FirebaseService } from '../firebase/firebase.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SoilMoistureModule } from '../sensors/soil-moisture/soil-moisture.module';

@Module({
  imports: [
    SoilMoistureModule,
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://localhost:1883',
        },
      },
    ]),
  ],
  providers: [IrrigationService, PumpService, FirebaseService],
  exports: [IrrigationService],
})
export class IrrigationModule {}
