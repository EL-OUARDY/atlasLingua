"use client";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { useEffect } from "react";

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

export default function InstallPWAListener() {
  const { setInstallDeferredPrompt } = useAppSettings();

  // Listen for PWA install event
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [setInstallDeferredPrompt]);

  return null;
}
