import { useState } from "react";
import { YA_MAP_IFRAME_SRC } from "@/config/links";

type YandexMapProps = {
  src?: string;
  title?: string;
};

export function YandexMap({ src, title }: YandexMapProps) {
  const [isLoading, setIsLoading] = useState(true);
  const iframeSrc = src && src.trim().length > 0 ? src : YA_MAP_IFRAME_SRC;
  const iframeTitle = title && title.trim().length > 0 ? title : "Belleza на Яндекс.Картах";

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-border bg-card">
      <iframe
        src={iframeSrc}
        title={iframeTitle}
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
        loading="lazy"
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card/85 backdrop-blur-sm text-muted-foreground">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-gold" />
          <span className="text-sm font-medium">Загрузка карты...</span>
        </div>
      )}
    </div>
  );
}
