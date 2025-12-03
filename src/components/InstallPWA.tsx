/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { Button } from "./ui/button";
import { DownloadIcon, ShareIcon } from "lucide-react";

interface Props {
  className?: string;
}

export default function InstallPWA({ className }: Props) {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const { installdeferredPrompt } = useAppSettings();

  useEffect(() => {
    // Detect iOS
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream,
    );
    // Detect if PWA
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  const handleInstallClick = () => {
    if (installdeferredPrompt) {
      installdeferredPrompt.prompt();
      installdeferredPrompt.userChoice.then((choiceResult: any) => {
        console.log("User choice:", choiceResult.outcome);
      });
    } else {
      setShowGuide(true);
    }
  };

  // Don't show install button if already installed
  if (isStandalone) {
    return null;
  }

  return (
    <div
      className={clsx(
        "install-app flex w-full flex-col gap-4 rounded-2xl border bg-background p-4 text-sm",
        className,
      )}
    >
      {!showGuide && (
        <>
          <p className="">
            Install the app on your device for instant, one-tap access.
          </p>
          <Button
            onClick={handleInstallClick}
            className="flex w-fit flex-1 items-center gap-2 rounded-xl !py-1"
            aria-label="Install"
          >
            <DownloadIcon className="size-4" />
            Install
          </Button>
        </>
      )}

      {/* iOS guide */}
      {showGuide && isIOS && (
        <p className="">
          To install this app on your iOS device, tap the share button{" "}
          <ShareIcon className="mx-2 inline size-4" /> and then{" "}
          <span className="font-semibold">Add to Home Screen</span>.
        </p>
      )}

      {/* Android/Desktop guide */}
      {showGuide && !isIOS && (
        <p className="">
          To install, open the browser menu and tap the option{" "}
          <span className="font-semibold">Add to Home Screen</span>. or click
          the install icon in the address bar.
        </p>
      )}
    </div>
  );
}
