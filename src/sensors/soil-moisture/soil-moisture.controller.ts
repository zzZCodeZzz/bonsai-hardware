import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SoilMoistureMessage } from './SoilMoisture';
import { SoilMoistureService } from './soil-moisture.service';

@Controller()
export class SoilMoistureController {
  constructor(private soilMoistureService: SoilMoistureService) {}

  @MessagePattern('/soil-moisture')
  async receiveSoilMoistureMessage(
    @Payload() message: SoilMoistureMessage,
  ): Promise<void> {
    this.soilMoistureService.queToRingBuffer(message);
  }
}
