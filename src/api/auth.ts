import { FirebaseError } from 'firebase/app';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';

import { auth, db } from 'utils/firebase';
import { AuthReturnType } from 'types/auth';
import { FirebaseErrorReturnType } from 'types/shared';
import { child, DataSnapshot, get, ref } from 'firebase/database';

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

export const logoutFromApp = async (): Promise<FirebaseErrorReturnType> => {
  try {
    await signOut(auth);

    return {};
  } catch (e: any) {
    console.log((e as FirebaseError).code);

    return { error: e as FirebaseError };
  }
};

export const fetchAdminStatus = async (uid: string): Promise<boolean> => {
  try {
    const snapshot: DataSnapshot = await get(child(ref(db), 'admin/ids'));

    if (!snapshot.exists()) {
      return false;
    }

    return (snapshot.val() as string[]).includes(uid);
  } catch (e: any) {
    console.log((e as FirebaseError).code);

    return false;
  }
};
