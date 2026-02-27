import * as React from "react";
import { cn } from "./utils";

const emotionColors = {
  joy: "bg-yellow-50 text-yellow-700 border-yellow-200",
  sadness: "bg-blue-50 text-blue-700 border-blue-200",
  anger: "bg-red-50 text-red-700 border-red-200",
  fear: "bg-purple-50 text-purple-700 border-purple-200",
  surprise: "bg-pink-50 text-pink-700 border-pink-200",
  disgust: "bg-orange-50 text-orange-700 border-orange-200",
  trust: "bg-green-50 text-green-700 border-green-200",
  neutral: "bg-gray-50 text-gray-700 border-gray-200",
};

export interface EmotionTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  emotion: keyof typeof emotionColors;
}

const EmotionTag = React.forwardRef<HTMLSpanElement, EmotionTagProps>(
  ({ className, emotion, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2 py-0.5 rounded text-xs border",
          emotionColors[emotion],
          className
        )}
        {...props}
      >
        {children || emotion}
      </span>
    );
  }
);
EmotionTag.displayName = "EmotionTag";

export { EmotionTag };
