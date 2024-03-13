"use client";

import { createContext, useContext } from "react";

interface RoleContextType {
  role: string | undefined;
}

interface RoleProviderTypes {
  initialRole: string | undefined;
  children: React.ReactNode;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ initialRole, children }: RoleProviderTypes) => {
  return (
    <RoleContext.Provider value={{ role: initialRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error("useRole must be used within a Role provider");
  }

  return context;
};
