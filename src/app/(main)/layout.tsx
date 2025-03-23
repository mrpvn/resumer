import Navbar from "@/components/navbar";
import { SubscriptionPlanModal } from "@/components/premium-modal";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      {children}
      <SubscriptionPlanModal />
    </div>
  );
};

export default Layout;
