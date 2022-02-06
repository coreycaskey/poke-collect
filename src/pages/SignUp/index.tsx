import { AuthForm } from 'components/AuthForm/AuthForm';

export interface SignUpPageProps {}

export const SignUpPage: React.FC<SignUpPageProps> = () => {
  // const navigate = useNavigate();

  // const onSignUpHandler = async () => {
  //   setSigningUp(true);

  //   const { userCredential, error } = await signUpForApp(email, password);

  //   setTimeout(() => {
  //     setSigningUp(false);

  //     if (error) {
  //       setShowErrorToast(true);
  //       setErrorMsg(error.code);
  //       return;
  //     }

  //     if (userCredential) {
  //       // save user in context for auth provider
  //       setUser(userCredential.user);

  //       // prevent backtracking to login page
  //       navigate(AppRoutes.Gallery, { replace: true });
  //     }
  //   }, 1000);
  // };

  return <AuthForm isLoginForm={false} />;
};
