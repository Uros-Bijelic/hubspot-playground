'use client';

import { Owner } from '@/types';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type AuthContext = {
  owner: Owner | null;
  setCurrentOwner: (owner: Owner) => void;
};

const AuthContext = createContext<AuthContext>({ owner: null, setCurrentOwner: () => {} });

type AuthContextProvider = {
  children?: ReactNode;
};

const AuthContextProvider = ({ children }: AuthContextProvider) => {
  const [owner, setOwner] = useState<Owner | null>(null);

  const setCurrentOwner = (owner: Owner) => {
    setOwner(owner);
  };

  useEffect(() => {
    console.log('owner', owner);
  }, [owner]);

  return <AuthContext.Provider value={{ owner, setCurrentOwner }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext not used inside AuthContextProvider');
  }

  return authContext;
};
