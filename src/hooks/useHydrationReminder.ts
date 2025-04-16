import { useEffect } from "react";
import { useAuth } from "./useAuth";

export function useHydrationReminder() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !("Notification" in window)) return;

    Notification.requestPermission().then((permission) => {
      if (permission !== "granted") return;

      const interval = setInterval(() => {
        new Notification("Hydrapp 💧", {
          body: "Hora de beber água!",
        });
      }, 60 * 60 * 1000); // 1h

      return () => clearInterval(interval);
    });
  }, [user]);
}
