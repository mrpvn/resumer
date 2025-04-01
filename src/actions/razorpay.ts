"use server";
import Razorpay from "razorpay";
import { env } from "@/env";
import { templates } from "@/lib/templates";
import { auth } from "@clerk/nextjs/server";

export async function CreateRazorpayOrder(templateId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }
  const template = templates.find((t) => t.id === templateId);
  const amount = template?.price;

  if (!amount) {
    throw new Error("Invalid template ID");
  }

  const razorpay = new Razorpay({
    key_id: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: env.RAZORPAY_KEY_SECRET,
  });

  const order = await razorpay.orders.create({
    amount: amount * 100, // Amount in paise
    currency: "INR",
    receipt: `receipt_${templateId}`,
    notes: {
      template_id: template.id,
      user_id: userId,
      template_name: template.name,
      purchased_at: new Date().toISOString(),
    },
  });

  return {
    orderId: order.id,
    amount,
  };
}
