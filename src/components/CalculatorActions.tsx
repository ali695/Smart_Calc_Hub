import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRealtimeFavorites } from "@/hooks/useRealtimeFavorites";
import { useRealtimeHistory } from "@/hooks/useRealtimeHistory";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Heart, Copy, Printer, Share2 } from "lucide-react";
import { PrintPreviewModal } from "@/components/PrintPreviewModal";

interface CalculatorActionsProps {
  calculatorSlug: string;
  calculatorName: string;
  results: Record<string, any> | null;
  inputs: Record<string, any>;
  formula?: string;
}

export const CalculatorActions = ({
  calculatorSlug,
  calculatorName,
  results,
  inputs,
  formula
}: CalculatorActionsProps) => {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useRealtimeFavorites();
  const { saveHistory } = useRealtimeHistory();
  const { logEvent } = useAnalytics();
  const [copied, setCopied] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  const favorite = isFavorite(calculatorSlug);

  const handleToggleFavorite = async () => {
    await toggleFavorite(calculatorSlug);
    logEvent('favorite', calculatorSlug, { action: favorite ? 'remove' : 'add' });
  };

  const handleCopy = async () => {
    if (!results) {
      toast({
        title: "Nothing to copy",
        description: "Please calculate a result first",
        variant: "destructive"
      });
      return;
    }

    const text = Object.entries(results)
      .map(([key, val]) => `${key}: ${val}`)
      .join("\n");

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Copied!",
      description: "Results copied to clipboard"
    });
    
    logEvent('export', calculatorSlug, { type: 'copy' });
  };

  const handlePrintClick = () => {
    if (!results) {
      toast({
        title: "Nothing to print",
        description: "Please calculate a result first",
        variant: "destructive"
      });
      return;
    }
    setShowPrintPreview(true);
    logEvent('export', calculatorSlug, { type: 'print_preview' });
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: calculatorName,
          text: `Check out this ${calculatorName} on SmartCalc Hub`,
          url
        });
        logEvent('share', calculatorSlug, { method: 'native' });
      } catch (err) {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Calculator link copied to clipboard"
      });
      logEvent('share', calculatorSlug, { method: 'clipboard' });
    }
  };

  // Auto-save to history when results change (if logged in)
  const handleSaveResult = async () => {
    if (user && results) {
      await saveHistory(calculatorSlug, inputs, results);
    }
  };

  const printData = results ? {
    title: calculatorName,
    inputs: Object.entries(inputs).map(([key, val]) => ({ label: key, value: String(val) })),
    results: Object.entries(results).map(([key, val]) => ({ label: key, value: String(val) })),
    formula,
    timestamp: new Date()
  } : null;

  return (
    <>
      <div className="flex flex-wrap gap-2 pt-4 border-t">
        <Button
          variant={favorite ? "default" : "outline"}
          size="sm"
          onClick={handleToggleFavorite}
          className="gap-2"
        >
          <Heart className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />
          {favorite ? "Favorited" : "Favorite"}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-2"
          disabled={!results}
        >
          <Copy className="h-4 w-4" />
          {copied ? "Copied!" : "Copy"}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrintClick}
          className="gap-2"
          disabled={!results}
        >
          <Printer className="h-4 w-4" />
          Print / PDF
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>

      <PrintPreviewModal
        isOpen={showPrintPreview}
        onClose={() => setShowPrintPreview(false)}
        data={printData}
      />
    </>
  );
};
