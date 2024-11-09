import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";

type TWorkspaceAvatarProps = {
  imageURL?: string;
  name: string;
  className?: string;
};

const WorkspaceAvatar: React.FC<TWorkspaceAvatarProps> = ({
  imageURL,
  name,
  className,
}) => {
  if (imageURL)
    return (
      <div className={cn("size-10 relative rounded-md overflow-hidden", className)}>
        <Image src={imageURL} alt={imageURL} fill className="object-cover" />
      </div>
    );

  return (
    <Avatar className={cn("size-10 rounded-md", className)}>
      <AvatarFallback className="text-white bg-blue-600 font-semibold text-lg uppercase rounded-md">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default WorkspaceAvatar;
