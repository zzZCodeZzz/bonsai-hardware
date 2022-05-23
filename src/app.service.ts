import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('MQTT_SERVICE') private client: ClientProxy) {}
  getHello(): string {
    return 'Irrigate!';
  }
}
