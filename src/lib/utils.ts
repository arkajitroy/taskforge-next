import { TWorkspace } from "@/features/workspaces/others/types";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateInvitationCode(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let invitationCode = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    invitationCode += characters[randomIndex];
  }

  return invitationCode;
}

export function generateInviteCodeLink(initialValues: TWorkspace): string {
  const fullLink = `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`;
  return fullLink;
}

export function copyToClipboard(parsedText: string) {
  navigator.clipboard
    .writeText(parsedText)
    .then(() => toast.success("Invite link copied to clipboard!"));
}
