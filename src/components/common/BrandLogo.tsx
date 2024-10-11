import Image from "next/image";
import React from "react";

type TBrandLogoProps = {
  name: string;
  title: string;
  height?: number;
  width?: number;
  alt?: string;
  className?: string;
};

const BrandLogo: React.FC<TBrandLogoProps> = ({
  name,
  title,
  height = 50,
  width = 50,
  alt = "brand-logo",
  className = "",
}) => {
  const getImageUrl = (imageName: string, folder = "logo") => `/${folder}/${imageName}`;

  return (
    <div className={`flex items-center cursor-pointer w-fit ${className}`}>
      <Image
        src={getImageUrl(name, "logo")}
        alt={alt}
        height={height}
        width={width}
        priority
        className="mr-2"
      />
      <span className="text-xl font-bold text-gray-800">{title}</span>
    </div>
  );
};

export default BrandLogo;
