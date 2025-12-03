import { Outlet } from "react-router-dom";
import { AppSettingsProvider } from "@/contexts/AppSettingsContext";
import { UserProvider } from "@/contexts/UserContext";
import { Toaster } from "@/components/ui/sonner";
import ShareLinkProvider from "@/contexts/ShareLinkContext";
import { HistoryProvider } from "@/contexts/HistoryContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import PageLoader from "@/components/PageLoader";

function App() {
  return (
    <>
      <PageLoader />
      <UserProvider>
        <AppSettingsProvider defaultTheme="system">
          <HistoryProvider>
            <NotificationProvider>
              <ShareLinkProvider>
                <Outlet />
              </ShareLinkProvider>
            </NotificationProvider>
          </HistoryProvider>
        </AppSettingsProvider>
        <Toaster />
      </UserProvider>
    </>
  );
}

export default App;
