import { useSearchParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import AuthLayoutMinimal from '../features/auth/components/AuthLayoutMinimal';
import LoginFormMinimal from '../features/auth/components/LoginFormMinimal';
import RegisterFormMinimal from '../features/auth/components/RegisterFormMinimal';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const isLogin = mode === 'login';

  return (
    <AuthLayoutMinimal>
      <AnimatePresence mode="wait">
        {isLogin ? (
          <LoginFormMinimal key="login" />
        ) : (
          <RegisterFormMinimal key="register" />
        )}
      </AnimatePresence>
    </AuthLayoutMinimal>
  );
};

export default Auth;