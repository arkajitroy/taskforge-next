import { useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AlertTriangle } from "lucide-react";
import ResponsiveModal from "@/components/common/responsive-modal";

export const useConfirm = (
  title: string,
  message: string,
  variant: ButtonProps["variant"] = "primary"
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(
    null
  );
  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationCard = () => (
    <ResponsiveModal open={promise !== null} onOpenChange={handleCancel}>
      <Card className="w-full h-full shadow-lg overflow-hidden">
        {/* Header */}
        <CardHeader className="bg-gray-200 dark:bg-yellow-900/20 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-slate-600 rounded-full p-2">
              <AlertTriangle className="h-4 w-4 text-white" />
            </div>
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          </div>
          <CardDescription className="text-sm text-justify">{message}</CardDescription>
        </CardHeader>

        {/* Body */}
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. Please confirm that you want to proceed.
          </p>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-col sm:flex-row sm:justify-end gap-3 py-2">
          <Button variant="outline" onClick={handleCancel} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button
            variant={variant}
            onClick={handleConfirm}
            className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Confirm
          </Button>
        </CardFooter>
      </Card>
    </ResponsiveModal>
  );

  return [ConfirmationCard, confirm];
};
