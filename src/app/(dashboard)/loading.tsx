import React from "react";
import { Loader } from "lucide-react";

export default function Dashboardloading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader className="size-8 animate-spin text-muted-foreground" />
    </div>
  );
}
