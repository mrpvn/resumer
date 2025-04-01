"use server";
import { env } from "@/env";
import prisma from "@/lib/prisma-client";
import crypto from "crypto";
import { NextResponse } from "next/server";

const RAZORPAY_WEBHOOK_SECRET = env.RAZORPAY_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const payload = await req.text();
    const signature = req.headers.get("x-razorpay-signature") as string;

    // ✅ Verify Razorpay Signature
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
      .update(payload)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const body = JSON.parse(payload);

    if (body.event === "payment.captured") {
      const data = body.payload.payment.entity;

      // ✅ Extract details
      const templateId = data.notes.template_id;
      const userId = data.notes.user_id;

      // ✅ Save purchase details in the database
      await prisma.user.update({
        where: {
          userId: userId,
        },
        data: {
          templates: {
            push: templateId as string,
          },
        },
      });
      return NextResponse.json({
        message: "Payment success and template unlocked",
      });
    }

    return NextResponse.json({ message: "Unhandled event" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
