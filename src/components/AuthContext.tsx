import React, { createContext, useState } from "react";

export interface AuthData {
  token: string;
  userId: string;
  email: string;
  fullname: string;
  isLoggedIn: boolean;
}

const AuthContext = createContext<{
  authData: AuthData;
  setAuthData: React.Dispatch<React.SetStateAction<AuthData>>;
}>({
  authData: {
    token: "",
    userId: "",
    email: "",
    fullname: "",
    isLoggedIn: false,
  },
  setAuthData: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authData, setAuthData] = useState<AuthData>({
    email: "",
    fullname: "",
    token: "",
    userId: "",
    isLoggedIn: false,
  });

  return (
    <AuthContext.Provider
      value={{
        authData,
        setAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
