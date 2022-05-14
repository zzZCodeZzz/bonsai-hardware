import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IrrigationService } from './irrigation/irrigation.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly irrigationService: IrrigationService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    await this.irrigationService.irrigate();
    return this.appService.getHello();
  }
}
