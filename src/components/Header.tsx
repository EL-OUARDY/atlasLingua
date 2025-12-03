import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Link, useNavigate } from "react-router-dom";
import MainMenu from "./MainMenu";
import { APP_NAME } from "@/shared/constants";
import ThemeSwitch from "./ThemeSwitch";
import { useNotification } from "@/contexts/NotificationContext";
import { ROUTES } from "@/routes/routes";
import { useUser } from "@/contexts/UserContext";
import authService from "@/services/authService";
import { CanceledError } from "axios";
import { toast } from "sonner";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebaseConfig";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import BellIcon from "./ui/icons/BellIcon";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";

function Header() {
  const { toggleNotification, hasNewNotifications } = useNotification();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  function logout() {
    const { request } = authService.logout();
    request
      .then(() => {
        setUser(undefined);
        // Firebase logout
        signOut(auth);
        window.location.href = ROUTES.home;
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;

        toast("Can't perform action!", {
          action: {
            label: "Hide",
            onClick: () => {},
          },
        });
      })
      .finally(() => {});
  }

  function loginClick() {
    // save return url
    localStorage.setItem(
      APP_NAME + "-return-url",
      location.pathname + location.search,
    );

    navigate(ROUTES.login);
  }

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 fixed inset-0 z-10 flex h-16 w-full shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear md:sticky md:border-none">
      <div className="flex w-full items-center gap-2 px-4">
        <SidebarTrigger className="md:border-0" />
        <Separator
          orientation="vertical"
          className="mr-2 hidden data-[orientation=vertical]:h-4 md:block"
        />

        <Button
          onClick={() => toggleNotification()}
          variant="outline"
          size="icon"
          className="relative ml-auto overflow-hidden md:hidden md:rounded-full"
        >
          <BellIcon className="size-5" />
          {hasNewNotifications && (
            <div className="absolute right-[0.65rem] top-[0.7rem] size-[0.5rem] rounded-full bg-red-600"></div>
          )}
          <span className="sr-only">Notifications</span>
        </Button>

        <MainMenu className="!z-100 hidden md:block" />

        <div className="flex gap-2 md:ml-auto">
          <div className="hidden md:block">
            <Button
              variant="outline"
              size="icon"
              className="relative overflow-hidden md:rounded-full"
              onClick={() => toggleNotification()}
            >
              <BellIcon className="size-5" />
              {hasNewNotifications && (
                <div className="absolute right-[0.65rem] top-[0.7rem] size-[0.5rem] rounded-full bg-red-600"></div>
              )}
              <span className="sr-only">notifications</span>
            </Button>
          </div>
          <ThemeSwitch />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="flex items-center justify-center overflow-hidden md:rounded-full"
                title="User Account"
              >
                <Avatar className="size-6">
                  <AvatarImage
                    src={user?.avatar}
                    alt={user?.name}
                    className=""
                  />
                  <AvatarFallback className="!bg-transparent">
                    <User className="size-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user && (
                <Link to={ROUTES.settings.profile}>
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
              )}
              <Link to={ROUTES.contact}>
                <DropdownMenuItem className="cursor-pointer">
                  Contact
                </DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />
              {!user && (
                <DropdownMenuItem
                  onClick={loginClick}
                  className="cursor-pointer"
                >
                  Login
                </DropdownMenuItem>
              )}
              {user && (
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  Logout
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;
