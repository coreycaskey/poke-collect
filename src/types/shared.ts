import { FirebaseError } from 'firebase/app';

/*
  Misc Return Types
*/

export interface ErrorReturnType {
  error?: Error;
}

export interface FirebaseErrorReturnType {
  error?: FirebaseError;
}
