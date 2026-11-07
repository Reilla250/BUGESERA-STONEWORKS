import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full border border-granite/30 bg-white px-3 text-sm text-basalt placeholder:text-granite/60 focus-visible:border-basalt focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-hivis",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full border border-granite/30 bg-white px-3 py-2 text-sm text-basalt placeholder:text-granite/60 focus-visible:border-basalt focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-hivis",
        className
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return <label className={cn("mb-1.5 block text-sm font-medium text-basalt", className)} {...props} />;
}
