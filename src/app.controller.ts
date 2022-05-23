import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MQTT_SERVICE') private client: ClientProxy,
  ) {}

  @MessagePattern('health-check')
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
