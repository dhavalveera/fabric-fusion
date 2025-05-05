import type { StepsDataProps } from "@/types";

export const createProductSteps: StepsDataProps[] = [
  {
    id: "basic",
    title: "Basic",
    description: "Product Basic Information such as Name, Price, etc.",
  },
  {
    id: "variants",
    title: "Variants",
    description: "Product Variants like Size, Color, etc.",
  },
  {
    id: "image",
    title: "Image",
    description: "Display or Thumbnail Picture of the Product.",
  },
  {
    id: "policies",
    title: "Policies",
    description: "Product Policies such as Return Policy & Care Instructions.",
  },
  {
    id: "review",
    title: "Review",
    description: "Review the Product before Creating it.",
  },
];
