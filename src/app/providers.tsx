"use client";

import React, { PropsWithChildren } from "react";
import { QueryProvider } from "@/providers/query-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <TooltipProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </TooltipProvider>
    </QueryProvider>
  );
}
