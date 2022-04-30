import { Injectable, OnModuleInit } from '@nestjs/common';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig';
import { firebaseUserConfig } from '../../firebase/firebaseUserConfig';
import sensorLib from 'node-dht-sensor';

@Injectable()
export class TemperatureMoistureService implements OnModuleInit {
  async onModuleInit() {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      firebaseUserConfig.email,
      firebaseUserConfig.password,
    );
    console.log(`The module has been initialized.`);
    const docRef = await addDoc(collection(db, 'test'), {
      wohoo: 'yay',
    });
  }

  private readSensor(): any {
    const readout = sensorLib.read(22, 4);

    console.log(
      `[readout] ` +
        `temperature: ${readout.temperature.toFixed(1)}°C, ` +
        `humidity: ${readout.humidity.toFixed(1)}%`,
    );
  }
}
