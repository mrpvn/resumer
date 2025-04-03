"use client";
import { env } from "@/env";
import useRazorpay from "@/hooks/useRazorPay";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface TemplateProps {
  template: {
    id: string;
    name: string;
    image: string;
    price: number;
    priceId: string;
  };
}

const CheckoutButton = ({ template }: TemplateProps) => {
  const { id, name, price } = template;
  const { mutate, isPending } = useRazorpay();
  const { user } = useUser();

  const handlePayment = () => {
    if (!user || !user.emailAddresses?.length) {
      toast.error("User details are missing. Please log in.");
      return;
    }
    mutate(id, {
      onSuccess: ({ orderId, amount }) => {
        const options = {
          key: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount * 100, // Amount in paise
          currency: "INR",
          name: "Resumer",
          description: `Purchase ${name} Template`,
          order_id: orderId,
          prefill: {
            name: user?.fullName || "",
            email: user?.emailAddresses[0].emailAddress || "",
          },
          theme: {
            color: "#6366f1",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      },
      onError: (error) => {
        console.error("Payment failed:", error);
        toast.error("Failed to initiate payment.");
      },
    });
  };

  return (
    <Button
      onClick={handlePayment}
      className={`cursor-pointer ${
        isPending ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isPending}
    >
      {isPending ? "Processing..." : `Buy Template ₹${price}`}
    </Button>
  );
};

export default CheckoutButton;
