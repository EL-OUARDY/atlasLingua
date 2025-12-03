import { BeforeInstallPromptEvent } from "@/components/InstallPWAListner";
import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "system";
export type Font = "geist" | "system";

type AppSettingsProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultFont?: Font;
  storageKey?: string;
};

type AppSettingsState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  font: Font;
  setFont: (font: Font) => void;

  installdeferredPrompt: BeforeInstallPromptEvent | null;
  setInstallDeferredPrompt: (e: BeforeInstallPromptEvent | null) => void;
};

const initialState: AppSettingsState = {
  theme: "system",
  setTheme: () => null,
  font: "geist",
  setFont: () => null,
  installdeferredPrompt: null,
  setInstallDeferredPrompt: () => null,
};

const AppSettingsProviderContext =
  createContext<AppSettingsState>(initialState);

export function AppSettingsProvider({
  children,
  defaultTheme = "system",
  defaultFont = "geist",
  storageKey = "APP_THEME",
  ...props
}: AppSettingsProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  const [font, setFont] = useState<Font>(
    () => (localStorage.getItem(storageKey + "-font") as Font) || defaultFont,
  );

  const [installdeferredPrompt, setInstallDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      root.style.colorScheme = systemTheme;
      return;
    }

    root.classList.add(theme);
    root.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;

    if (font === "system") {
      root.classList.add("font-system-ui");
    } else {
      root.classList.remove("font-system-ui");
    }
  }, [font]);

  const value = {
    theme,
    font,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    setFont: (font: Font) => {
      localStorage.setItem(storageKey + "-font", font);
      setFont(font);
    },
    installdeferredPrompt,
    setInstallDeferredPrompt,
  };

  return (
    <AppSettingsProviderContext.Provider {...props} value={value}>
      {children}
    </AppSettingsProviderContext.Provider>
  );
}

export const useAppSettings = () => {
  const context = useContext(AppSettingsProviderContext);

  if (context === undefined)
    throw new Error("useAppSettings must be used within a AppSettingsProvider");

  return context;
};
