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
  ): Promise<string> {
    this.soilMoistureService.queToRingBuffer(message);
    let meanValueFromBuffer = this.soilMoistureService.getMeanValueFromBuffer(
      message.sensorId,
    );

    console.log('analog mean value raw', meanValueFromBuffer);

    if (meanValueFromBuffer > 855) {
      meanValueFromBuffer = 855;
    }

    console.log('analog mean value cut', meanValueFromBuffer);

    const percentage = ((meanValueFromBuffer - 482) / 4.17 - 100) * -1;

    console.log('percentage', percentage);
    return '';
  }
}
