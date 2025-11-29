import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  gradient?: string;
}

export const PageHeader = ({ 
  title, 
  description, 
  icon,
  gradient = "from-primary via-primary-glow to-accent"
}: PageHeaderProps) => {
  return (
    <div className={`bg-gradient-to-r ${gradient} text-primary-foreground py-16 animate-fade-in`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {icon && (
            <div className="inline-flex p-4 rounded-full bg-white/10 backdrop-blur-sm mb-4 animate-scale-in">
              {icon}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
            {title}
          </h1>
          {description && (
            <p className="text-lg md:text-xl opacity-95 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
