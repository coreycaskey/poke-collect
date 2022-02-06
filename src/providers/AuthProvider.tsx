import React, { createContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { auth, firebaseConfig } from 'utils/firebase';
import { useFirebaseAuth } from 'hooks/Firebase/useFirebaseAuth';
import { fetchAdminStatus } from 'api/auth';

// TODO: how to refresh the user token to avoid logging them out???
export interface AuthContextType {
  user: User | undefined;
  isAdmin: boolean;
  loading: boolean;
  setUser: (user: User | undefined) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setLoading: (loading: boolean) => void;
}

const initialContext: AuthContextType = {
  user: undefined,
  isAdmin: false,
  loading: false,
  setUser: () => {
    /* intentionally left blank */
  },
  setIsAdmin: () => {
    /* intentionally left blank */
  },
  setLoading: () => {
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const sessionUser = getSessionUser();
  //   setUser(sessionUser);
  // }, []);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = auth.onAuthStateChanged(async (currUser) => {
      if (currUser) {
        if (currUser.uid !== user?.uid) {
          const isAdminUser = await fetchAdminStatus(currUser.uid);

          setUser(currUser);
          setIsAdmin(isAdminUser);
        }
      } else {
        setUser(undefined);
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, setUser, setIsAdmin, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
