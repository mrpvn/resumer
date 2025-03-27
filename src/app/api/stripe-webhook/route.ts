import { env } from "@/env";
import prisma from "@/lib/prisma-client";
import stripe from "@/lib/stripe";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return new Response("Signature is missing", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const userId = event.data.object.metadata?.userId;
      if (!userId) {
        throw new Error("User ID is missing in session metadata");
      }

      await (
        await clerkClient()
      ).users.updateUserMetadata(userId, {
        privateMetadata: {
          stripeCustomerId: event.data.object.customer as string,
        },
      });

      await prisma.user.update({
        where: {
          userId: userId,
        },
        data: {
          templates: {
            push: event.data.object.metadata?.selected_template as string,
          },
        },
      });
    }

    return new Response("Event received", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}
