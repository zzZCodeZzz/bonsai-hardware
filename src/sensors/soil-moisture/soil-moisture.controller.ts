import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { SoilMoistureMessage } from './SoilMoisture';

@Controller()
export class SoilMoistureController {
  @MessagePattern('plant/+/soil-moisture')
  async receiveSoilMoistureMessage(
    @Payload() data: SoilMoistureMessage,
    @Ctx() context: MqttContext,
  ): Promise<string> {
    console.log('data', data);
    console.log('context', context);
    console.log('context.packet', context.getPacket());
    console.log('context.topic', context.getTopic());
    console.log('context.args', context.getArgs());
    return '';
  }
}
