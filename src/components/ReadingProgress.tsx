import { useEffect, useState } from "react";

export const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;
      const percentage = Math.floor((scrollTop / trackLength) * 100);
      
      setProgress(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener("scroll", calculateProgress);
    calculateProgress();

    return () => window.removeEventListener("scroll", calculateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-muted/30 z-50">
      <div
        className="h-full bg-gradient-to-r from-primary via-primary-glow to-accent transition-all duration-150 ease-out shadow-neon"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
