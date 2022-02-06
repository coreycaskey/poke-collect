import React, { createContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { firebaseConfig } from 'utils/firebase';

// TODO: how to refresh the user token to avoid logging them out???
export interface AuthContextType {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}

const initialContext: AuthContextType = {
  user: undefined,
  setUser: () => {
    /* intentionally left blank */
  },
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
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const sessionUser = getSessionUser();
    setUser(sessionUser);
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
