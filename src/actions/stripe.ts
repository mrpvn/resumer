"use server";

import { env } from "@/env";
import stripe from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

export async function CreateCheckoutSession(
  priceId: string,
  selectedTemplate: string
) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const stripeCustomerId = user.privateMetadata.stripeCustomerId as
    | string
    | undefined;

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "payment",
    success_url: `${env.NEXT_PUBLIC_BASE_URL}/billing/success`,
    cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/billing`,
    customer: stripeCustomerId,
    customer_email: stripeCustomerId
      ? undefined
      : user.emailAddresses[0].emailAddress,
    metadata: {
      userId: user.id,
      selected_template: selectedTemplate,
    },
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }

  return session.url;
}
