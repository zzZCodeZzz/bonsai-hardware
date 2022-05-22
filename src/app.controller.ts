import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IrrigationService } from './irrigation/irrigation.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('plant')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly irrigationService: IrrigationService,
  ) {}

  /*@Get()
  async getHello(): Promise<string> {
    await this.irrigationService.irrigate();
    return this.appService.getHello();
  }*/

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @MessagePattern('plant')
  plantOne(@Payload() data) {
    console.log('data', data);
    return 'data' + data;
  }
}
