import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen items-center justify-center p-3">
      {children}
    </div>
  );
};

export default AuthLayout;
