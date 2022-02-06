import { FirebaseError } from 'firebase/app';
import { User, UserCredential } from 'firebase/auth';

export interface AuthStateHookReturnType {
  user: User | null;
}

export interface AuthReturnType {
  userCredential?: UserCredential;
  error?: FirebaseError;
}

// TODO: add custom messages for authentication errors

// export const AuthError = {
//   'auth/email-already-exists': 'Email already in use',

// } as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
// export type AuthError = typeof AuthError[keyof typeof AuthError];
