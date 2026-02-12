"use client";

interface AvatarImageProps {
  src: string;
  alt: string;
  fallbackText: string;
}

export function AvatarImage({ src, alt, fallbackText }: AvatarImageProps) {
  return (
    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-accent via-purple-500 to-pink-500 p-1 overflow-hidden">
      <img 
        src={src}
        alt={alt}
        className="w-full h-full rounded-2xl object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `<div class="w-full h-full rounded-2xl bg-card flex items-center justify-center text-4xl font-bold text-gradient">${fallbackText}</div>`;
          }
        }}
      />
    </div>
  );
}
