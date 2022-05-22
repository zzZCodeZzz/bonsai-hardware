import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SoilMoistureMessage } from './SoilMoisture';

@Controller()
export class SoilMoistureController {
  @MessagePattern('/soil-moisture')
  async receiveSoilMoistureMessage(
    @Payload() data: SoilMoistureMessage,
  ): Promise<string> {
    console.log('data', data);
    return '';
  }
}
