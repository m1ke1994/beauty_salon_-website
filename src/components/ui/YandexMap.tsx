import { useState } from "react";
import { YA_MAP_IFRAME_SRC } from "@/config/links";

export function YandexMap() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-border bg-card">
      <iframe
        src={YA_MAP_IFRAME_SRC}
        title="Belleza \u043d\u0430 \u042f\u043d\u0434\u0435\u043a\u0441.\u041a\u0430\u0440\u0442\u0430\u0445"
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
        loading="lazy"
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card/85 backdrop-blur-sm text-muted-foreground">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-gold" />
          <span className="text-sm font-medium">{"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u043a\u0430\u0440\u0442\u044b..."}</span>
        </div>
      )}
    </div>
  );
}
