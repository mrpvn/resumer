"use client";

import { Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    image: string;
    price: number;
    priceId: string;
  };
  isSelected: boolean;
  onSelect: () => void;
  onPurchase: () => void;
  isPurchased: boolean | undefined;
}

export default function TemplateCard({
  template,
  isSelected,
  onSelect,
  onPurchase,
  isPurchased,
}: TemplateCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg overflow-hidden transition-all duration-200 group cursor-pointer",
        "border-2 hover:shadow-lg",
        isSelected ? "border-primary" : "border-border hover:border-primary/50"
      )}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full p-1">
          <Check className="h-4 w-4" />
        </div>
      )}

      <div className="relative">
        <Image
          src={template.image}
          alt={template.name}
          width={300}
          height={400}
          className="w-full h-auto object-cover aspect-[3/4]"
        />

        {!isPurchased && (
          <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center gap-2 p-4">
            <Lock className="h-8 w-8 text-muted-foreground" />
            <Badge variant="outline" className="mb-2">
              Locked
            </Badge>
            <Button className="cursor-pointer" size="sm" onClick={onPurchase}>
              Purchase ₹{template.price.toFixed(2)}
            </Button>
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-medium">{template.name}</h3>
      </div>
    </div>
  );
}
