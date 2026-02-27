import * as React from "react";
import { cn } from "./utils";
import { 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Facebook, 
  MessageCircle,
  FileText,
  Globe
} from "lucide-react";

const platformIcons = {
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  facebook: Facebook,
  reddit: MessageCircle,
  news: FileText,
  blog: Globe,
  forum: MessageCircle,
};

const platformColors = {
  twitter: "bg-blue-50 text-blue-600 border-blue-200",
  instagram: "bg-pink-50 text-pink-600 border-pink-200",
  youtube: "bg-red-50 text-red-600 border-red-200",
  linkedin: "bg-blue-50 text-blue-700 border-blue-200",
  facebook: "bg-blue-50 text-blue-600 border-blue-200",
  reddit: "bg-orange-50 text-orange-600 border-orange-200",
  news: "bg-gray-50 text-gray-700 border-gray-200",
  blog: "bg-purple-50 text-purple-600 border-purple-200",
  forum: "bg-green-50 text-green-600 border-green-200",
};

export interface PlatformTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  platform: keyof typeof platformIcons;
  showIcon?: boolean;
}

const PlatformTag = React.forwardRef<HTMLSpanElement, PlatformTagProps>(
  ({ className, platform, showIcon = true, children, ...props }, ref) => {
    const Icon = platformIcons[platform];
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border",
          platformColors[platform],
          className
        )}
        {...props}
      >
        {showIcon && <Icon className="w-3 h-3" />}
        {children || platform}
      </span>
    );
  }
);
PlatformTag.displayName = "PlatformTag";

export { PlatformTag };
