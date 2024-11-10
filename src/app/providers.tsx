"use client";

import React, { PropsWithChildren } from "react";
import { QueryProvider } from "@/providers/query-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <NuqsAdapter>
        <TooltipProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </TooltipProvider>
      </NuqsAdapter>
    </QueryProvider>
  );
}
