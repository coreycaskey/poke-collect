/*
  Application Typings
*/

import { FirebaseError } from 'firebase/app';
import { AuthError } from 'firebase/auth';

/*
  Misc Return Types
*/

export interface ErrorReturnType {
  error?: Error;
}

export interface FirebaseErrorReturnType {
  error?: FirebaseError;
}

export interface AuthErrorReturnType {
  error?: AuthError;
}
