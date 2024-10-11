export const getImagePath = (imageName: string, imageType: "logo" | "images" | "icons") => {
  return `/${imageType}/${imageName}`;
};
