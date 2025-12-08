import { ReactNode } from "react";
import { HeroSection } from "./HeroSection";

type CategoryType = 
  | "home" | "finance" | "health" | "math" | "conversion" 
  | "tech" | "engineering" | "science" | "business" 
  | "real-estate" | "crypto" | "blog" | "faq" | "contact" | "about" | "utility";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  category?: CategoryType | string;
  gradient?: string; // Legacy support
}

export const PageHeader = ({ 
  title, 
  description, 
  icon,
  category = "home",
  gradient // Legacy prop ignored
}: PageHeaderProps) => {
  return (
    <HeroSection
      category={category}
      title={title}
      description={description}
      icon={icon}
    />
  );
};
