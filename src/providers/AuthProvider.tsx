import React, { createContext, useState } from 'react';
import { User } from 'firebase/auth';

import { auth, firebaseConfig } from 'utils/firebase';
import { AuthStateHookReturnType } from 'types/auth-types';

// TODO: how to refresh the user token to avoid logging them out???
export interface AuthContextType {
  user: User | undefined;
  // loading: boolean;
  // error: Error | undefined;
  setUser: (user: User | undefined) => void;
  // signInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  // signOut: () => Promise<void>;
}

const initialContext: AuthContextType = {
  user: undefined,
  // loading: false,
  // error: undefined,
  setUser: () => {
    /* intentionally left blank */
  },
  // signInWithEmailAndPassword: (email: string, password: string) =>
  //   new Promise(() => {
  //     /* intentionally left blank */
  //   }),
  // signOut: () =>
  //   new Promise(() => {
  //     /* intentionally left blank */
  //   }),
};

const getSessionUser = () => {
  try {
    const user = sessionStorage.getItem(`firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`);

    return user ? (JSON.parse(user) as User) : undefined;
  } catch {
    return undefined;
  }
};

export const AuthContext = createContext<AuthContextType>(initialContext);

export const AuthProvider: React.FC = ({ children }) => {
  // const sessionUser = getSessionUser();

  const [user, setUser] = useState<User>();

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
