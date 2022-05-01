import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyByMZ4t1_zP03xNd7eJeuIlI5tXl3c9FgU',
  authDomain: 'bonsa-io.firebaseapp.com',
  projectId: 'bonsa-io',
  storageBucket: 'bonsa-io.appspot.com',
  messagingSenderId: '248875711278',
  appId: '1:248875711278:web:1850d30ee34e14c807d8bf',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

@Injectable()
export class FirebaseService implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const email = this.configService.get<string>('firebase_user');
    const pw = this.configService.get<string>('firebase_pw');
    await signInWithEmailAndPassword(auth, email, pw);
  }

  public safeToFirestore<T extends object>(collectionPath: string, value: T) {
    return addDoc(collection(db, collectionPath), value);
  }
}
