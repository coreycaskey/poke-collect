import { fetchAdminStatus } from 'api/auth';
import { AuthContext, AuthContextType } from 'providers/AuthProvider';
import { useContext, useEffect } from 'react';
import { auth } from 'utils/firebase';

export const useFirebaseAuth = () => {
  const { setUser, setIsAdmin } = useContext<AuthContextType>(AuthContext);


};
