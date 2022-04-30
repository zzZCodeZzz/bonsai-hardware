import { Injectable, OnModuleInit } from '@nestjs/common';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig';
import { firebaseUserConfig } from '../../firebase/firebaseUserConfig';

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
}
