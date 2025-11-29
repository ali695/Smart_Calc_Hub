import { Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export const SocialShareButtons = ({ url, title, description }: SocialShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = `https://smartcalchub.com${url}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);

  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = (platform: string, link: string) => {
    window.open(link, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border border-border">
      <span className="font-semibold text-sm">Share this article:</span>
      <div className="flex gap-2 flex-wrap justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare("Twitter", socialLinks.twitter)}
          className="gap-2 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all"
        >
          <Twitter className="h-4 w-4" />
          Twitter
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare("Facebook", socialLinks.facebook)}
          className="gap-2 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
        >
          <Facebook className="h-4 w-4" />
          Facebook
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare("LinkedIn", socialLinks.linkedin)}
          className="gap-2 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="gap-2 hover:bg-primary hover:text-primary-foreground transition-all"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" />
              Copy Link
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
