import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const sentimentBadgeVariants = cva(
  "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full transition-colors",
  {
    variants: {
      sentiment: {
        positive: "bg-accent-50 text-accent-600 border border-accent-200",
        neutral: "bg-gray-100 text-gray-600 border border-gray-200",
        negative: "bg-error-50 text-error-500 border border-red-200",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
      },
    },
    defaultVariants: {
      sentiment: "neutral",
      size: "md",
    },
  }
);

export interface SentimentBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sentimentBadgeVariants> {
  sentiment: "positive" | "neutral" | "negative";
}

const SentimentBadge = React.forwardRef<HTMLDivElement, SentimentBadgeProps>(
  ({ className, sentiment, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(sentimentBadgeVariants({ sentiment, size }), className)}
        {...props}
      >
        {sentiment === "positive" && <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />}
        {sentiment === "neutral" && <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />}
        {sentiment === "negative" && <span className="w-1.5 h-1.5 rounded-full bg-error-500" />}
        {children}
      </div>
    );
  }
);
SentimentBadge.displayName = "SentimentBadge";

export { SentimentBadge, sentimentBadgeVariants };
