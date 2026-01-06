import { useRegisterSW } from "virtual:pwa-register/react";

export const PwaUpdatePrompt = () => {
  const { needRefresh, updateServiceWorker } = useRegisterSW();
  const [isRefresh] = needRefresh;

  if (!isRefresh) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      <div className="bg-card border border-border shadow-card rounded-xl p-4 flex items-center gap-4">
        <div className="text-sm">
          <div className="font-medium">Доступно обновление</div>
          <div className="text-muted-foreground">
            Нажмите, чтобы обновить приложение.
          </div>
        </div>
        <button
          type="button"
          onClick={() => updateServiceWorker(true)}
          className="inline-flex items-center justify-center rounded-md bg-gold px-4 py-2 text-graphite text-sm font-medium hover:bg-gold-dark transition-colors"
        >
          Обновить
        </button>
      </div>
    </div>
  );
};
