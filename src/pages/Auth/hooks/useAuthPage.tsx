import { AuthContext, AuthContextType } from 'providers/AuthProvider';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'utils/routes';

export const useAuthPage = () => {
  const { user, setUser } = useContext<AuthContextType>(AuthContext);

  // TODO: rework this to be undefined by default —— add client-side check for validation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user) {
      navigate(AppRoutes.Gallery);
    }
  }, [user, navigate]);

  return {
    user,
    setUser,
    email,
    setEmail,
    password,
    setPassword,
    errorMsg,
    setErrorMsg,
    showAlert,
    setShowAlert,
    submitting,
    setSubmitting,
    loading,
    setLoading,
    navigate,
  };
};
