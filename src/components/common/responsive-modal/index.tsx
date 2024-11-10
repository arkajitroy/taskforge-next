import { useMedia } from "react-use";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import React from "react";
import { responsiveBreakpoints as breakpoints } from "@/constants/misc";

type TResponsiveModalProps = {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ResponsiveModal: React.FC<TResponsiveModalProps> = ({
  children,
  open,
  onOpenChange,
}) => {
  const isDesktop = useMedia(`(min-width: ${breakpoints.lg.min}px)`, true);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]">
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="overflow-y-auto hide-scrollbar max-h-[85vh]">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveModal;