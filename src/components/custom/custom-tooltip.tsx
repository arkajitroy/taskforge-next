"use client";

import React, { PropsWithChildren } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type TCustomToolTipProps = {
  tooltipText: string;
} & PropsWithChildren;

const CustomToolTip = ({ tooltipText, children }: TCustomToolTipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CustomToolTip;
