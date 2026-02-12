"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        // You could add a toast notification here
        alert("链接已复制到剪贴板");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <button 
      className="btn-secondary gap-2"
      onClick={handleShare}
    >
      <Share2 className="w-4 h-4" />
      <span>分享</span>
    </button>
  );
}
