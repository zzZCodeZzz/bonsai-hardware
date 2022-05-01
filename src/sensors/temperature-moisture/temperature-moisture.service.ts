import { Injectable } from '@nestjs/common';
import sensorLib from 'node-dht-sensor';

@Injectable()
export class TemperatureMoistureService {
  /*
  async onModuleInit() {
    const email = this.configService.get<string>('firebase_user');
    const pw = this.configService.get<string>('firebase_pw');

    const userCredential = await signInWithEmailAndPassword(auth, email, pw);

    console.log(`The module has been initialized.`);
    const docRef = await addDoc(collection(db, 'test'), {
      wohoo: 'yay',
    });
  }
*/

  private readSensor(): any {
    const readout = sensorLib.read(22, 4);

    console.log(
      `[readout] ` +
        `temperature: ${readout.temperature.toFixed(1)}°C, ` +
        `humidity: ${readout.humidity.toFixed(1)}%`,
    );
  }
}
