'use client';

import { Owner } from '@/types';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, type ReactNode } from 'react';

type AuthContext = {
  owner: Owner | null;
  setCurrentOwner: (owner: Owner) => void;
  logOutUser: () => void;
};

const AuthContext = createContext<AuthContext>({
  owner: null,
  setCurrentOwner: () => {},
  logOutUser: () => {},
});

type AuthContextProvider = {
  children?: ReactNode;
};

const AuthContextProvider = ({ children }: AuthContextProvider) => {
  const router = useRouter();
  const [owner, setOwner] = useState<Owner | null>(null);

  const setCurrentOwner = (owner: Owner) => {
    setOwner(owner);
  };

  const logOutUser = () => {
    setOwner(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ owner, setCurrentOwner, logOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext not used inside AuthContextProvider');
  }

  return authContext;
};
