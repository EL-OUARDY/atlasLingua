import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Header from "@/components/Header";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "@/components/SideBar";
import MobileNavigationBar from "@/components/MobileNavigationBar";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { useEffect, useRef } from "react";
import { HistoryProvider } from "@/contexts/HistoryContext";
import Welcome from "../Welcome";

function Layout() {
  const scrollAreaRef = useRef<React.ElementRef<typeof ScrollArea>>(null);
  const location = useLocation();

  useEffect(() => {
    // scroll to top everytime a new page displayed
    if (scrollAreaRef.current) {
      scrollAreaRef.current.children[1].scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  }, [location]);

  return (
    <div id="page-wrapper" className="flex h-dvh bg-muted/40">
      <HistoryProvider>
        <NotificationProvider>
          <SideBar />
          <ScrollArea className="h-dvh w-dvw overflow-auto">
            <section className="flex h-dvh min-h-[667px] flex-1 flex-col overflow-auto md:gap-4 md:py-4">
              <Header />
              <main className="mt-14 flex h-full flex-1 flex-grow flex-col gap-4 overflow-auto pb-14 md:mt-0 md:gap-6 md:p-4 md:px-6 md:py-0 landscape:min-h-[500px]">
                <ScrollArea ref={scrollAreaRef} className="flex-1">
                  <Outlet />
                </ScrollArea>
              </main>
              <MobileNavigationBar />
            </section>
            <ScrollBar orientation="horizontal" className="cursor-grab" />
          </ScrollArea>
        </NotificationProvider>
      </HistoryProvider>
      <Welcome />
    </div>
  );
}

export default Layout;
