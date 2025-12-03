import { Outlet } from "react-router-dom";
import Welcome from "../Welcome";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import Header from "../Header";
import InstallPWAListener from "../InstallPWAListner";
import Cookies from "js-cookie";
import MobileNavigationBar from "../MobileNavigationBar";

function Layout() {
  const defaultOpen = Cookies.get("sidebar_state") === "false" ? false : true;

  return (
    <div id="page-wrapper" className="flex min-h-dvh bg-background">
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {/* Page content */}
          <section className="flex flex-1 flex-col pb-14 pt-16 md:gap-4 md:px-4 md:pb-4 md:pt-0">
            <Outlet />
          </section>
          <MobileNavigationBar />
          <InstallPWAListener />
        </SidebarInset>
      </SidebarProvider>
      <Welcome />
    </div>
  );
}

export default Layout;
