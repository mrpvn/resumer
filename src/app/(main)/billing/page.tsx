"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Download, ShoppingBag } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data for purchased templates
const purchasedTemplates = [
  {
    id: "ORD-2023-001",
    name: "Professional Resume",
    price: 49,
    purchaseDate: "May 15, 2023",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-2023-002",
    name: "Creative Portfolio CV",
    price: 49,
    purchaseDate: "June 22, 2023",
    paymentMethod: "UPI",
  },
  {
    id: "ORD-2023-003",
    name: "Executive Bio Template",
    price: 49,
    purchaseDate: "July 10, 2023",
    paymentMethod: "Net Banking",
  },
  {
    id: "ORD-2023-004",
    name: "Modern Resume Template",
    price: 49,
    purchaseDate: "August 5, 2023",
    paymentMethod: "Wallet",
  },
];

export default function BillingHistoryPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalSpending = purchasedTemplates.reduce(
    (total, template) => total + template.price,
    0
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Billing & Order Summary</h1>
          <p className="text-muted-foreground mt-2">
            View your purchase history and billing details
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Purchase History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {purchasedTemplates.map((template) => (
              <div key={template.id} className="border rounded-lg p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="h-16 w-12 overflow-hidden rounded border border-border flex-shrink-0">
                    <Image
                      src={`/placeholder.svg?height=64&width=48`}
                      alt={template.name}
                      width={48}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Purchased on {template.purchaseDate}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-medium">₹{template.price}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => toggleItem(template.id)}
                  >
                    More Details
                    {openItems[template.id] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {openItems[template.id] && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Order ID:</span>
                        <span>{template.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Payment Method:
                        </span>
                        <span>{template.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="text-green-500">Completed</span>
                      </div>
                      <div className="mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 w-full sm:w-auto"
                        >
                          <Download className="h-4 w-4" />
                          Download Invoice
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="py-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Total Spending</h3>
                <p className="text-muted-foreground text-sm">
                  Lifetime purchases
                </p>
              </div>
              <div className="text-2xl font-bold">₹{totalSpending}</div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Buy More Templates
          </Button>
        </div>
      </div>
    </div>
  );
}
