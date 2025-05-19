import React from "react";
export const Layout: React.FC<{
  username: string;
  role: string;
  children: React.ReactNode;
}> = ({ children }) => <>{children}</>;
