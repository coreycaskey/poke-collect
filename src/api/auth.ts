import { FirebaseError } from 'firebase/app';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';

import { auth } from 'utils/firebase';
import { AuthReturnType } from 'types/auth-types';
import { FirebaseErrorReturnType } from 'types/shared';

export const signUpForApp = async (email: string, password: string): Promise<AuthReturnType> => {
  try {
    // persist auth state in session storage
    await setPersistence(auth, browserSessionPersistence);

    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    // userCredential is guaranteed to exist if no error is thrown
    return { userCredential };
  } catch (e: any) {
    console.log((e as FirebaseError).code);

    return { error: e as FirebaseError };
  }
};

export const loginToApp = async (email: string, password: string): Promise<AuthReturnType> => {
  try {
    // persist auth state in session storage
    await setPersistence(auth, browserSessionPersistence);

    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);

    // userCredential is guaranteed to exist if no error is thrown
    return { userCredential };
  } catch (e: any) {
    console.log((e as FirebaseError).code);

    return { error: e as FirebaseError };
  }
};

export const logoutFromApp = async (): Promise<FirebaseErrorReturnType | void> => {
  try {
    await signOut(auth);
  } catch (e: any) {
    console.log((e as FirebaseError).code);

    return { error: e as FirebaseError };
  }
};
