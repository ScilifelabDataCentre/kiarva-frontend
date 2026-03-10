"use client";

import * as React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpandableTextProps {
  preview: React.ReactNode;
  children: React.ReactNode;
  labelExpand?: string;
  labelCollapse?: string;
  className?: string;
}

export default function ExpandableText({
  preview,
  children,
  labelExpand = "Read more",
  labelCollapse = "Show less",
  className,
}: ExpandableTextProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top < 0) {
        containerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  };

  return (
    <Collapsible
      open={open}
      onOpenChange={handleOpenChange}
      className={className}
    >
      <div ref={containerRef}>{preview}</div>
      <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
        {children}
      </CollapsibleContent>
      <CollapsibleTrigger
        className={cn(
          "inline-flex items-center gap-1 font-medium text-fg-brand hover:underline",
          "cursor-pointer text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "mt-1"
        )}
      >
        {open ? labelCollapse : labelExpand}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </CollapsibleTrigger>
    </Collapsible>
  );
}
