import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import Logo from "./ui/icons/Logo";
import { APP_BMC, APP_NAME } from "@/shared/constants";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

import {
  BookOpenText,
  Library,
  Handshake,
  Star,
  Languages,
  MessageSquareText,
  MessagesSquare,
  Mail,
  LockKeyholeIcon,
  ChevronRight,
  InfoIcon,
} from "lucide-react";
import InstallPWA from "./InstallPWA";
import KoFiIcon from "./ui/icons/KoFiIcon";
import { useIsMobile } from "@/hooks/use-mobile";

interface IMenuLink {
  text: string;
  href: string;
  isExternalLink?: boolean;
  mobileOnly?: boolean;
  icon: React.ReactNode;
  section: "main" | "user actions" | "support";
}

const MenuLinks: IMenuLink[] = [
  {
    text: "Community",
    href: ROUTES.community,
    icon: <MessagesSquare />,
    section: "main",
  },
  {
    text: "Learn",
    href: ROUTES.learn,
    icon: <Library />,
    section: "main",
  },
  {
    text: "Favorites",
    href: ROUTES.favorites,
    icon: <Star />,
    section: "user actions",
  },
  {
    text: "Dictionary",
    href: ROUTES.dictionary,
    icon: <BookOpenText />,
    section: "main",
  },
  {
    text: "Feedback",
    href: ROUTES.feedback,
    icon: <MessageSquareText />,
    section: "user actions",
  },
  {
    text: "Contribution",
    href: ROUTES.contribution,
    icon: <Handshake />,
    section: "user actions",
  },
  {
    text: "Buy us a coffee",
    href: APP_BMC,
    isExternalLink: true,
    icon: <KoFiIcon />,
    section: "user actions",
  },
  {
    text: "Contact us",
    href: ROUTES.contact,
    icon: <Mail />,
    section: "support",
  },
  {
    text: "Our Vision",
    href: ROUTES.about,
    icon: <InfoIcon />,
    section: "support",
    mobileOnly: true,
  },
  {
    text: "Privacy Policy",
    href: ROUTES.privacy,
    icon: <LockKeyholeIcon />,
    section: "support",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { setOpen, setOpenMobile } = useSidebar();

  React.useEffect(() => {
    if (isMobile) {
      setOpen(false);
      setOpenMobile(false);
    }
  }, [isMobile, location, setOpen, setOpenMobile]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              to={ROUTES.home}
              className="flex items-center gap-2 py-2 font-semibold outline-none"
            >
              <span className="flex aspect-square size-8 items-center justify-center rounded-lg">
                <Logo className="size-5" />
              </span>
              <span className="flex flex-col gap-1 leading-none">
                <span className="text-base font-medium">{APP_NAME}</span>
              </span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="border-t">
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {/*  Translator */}
            <Collapsible asChild className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={"Translator"}>
                    <Languages />
                    <span>Translator</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <NavLink to={ROUTES.translate.index}>Text</NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <NavLink to={ROUTES.translate.summarization}>
                          Summarization
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <NavLink to={ROUTES.translate.transliteration}>
                          Transliteration
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {MenuLinks.filter((item) => item.section === "main").map((item) => (
              <SidebarMenuItem
                key={item.text}
                className={item.mobileOnly ? "md:hidden" : ""}
              >
                <SidebarMenuButton
                  onClick={() => {
                    if (item.isExternalLink) window.open(item.href, "_blank");
                    else navigate(item.href);
                  }}
                  tooltip={item.text}
                >
                  {item.icon && item.icon}
                  <span>{item.text}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>User Actions</SidebarGroupLabel>
          <SidebarMenu>
            {MenuLinks.filter((item) => item.section === "user actions").map(
              (item) => (
                <SidebarMenuItem
                  key={item.text}
                  className={item.mobileOnly ? "md:hidden" : ""}
                >
                  <SidebarMenuButton
                    onClick={() => {
                      if (item.isExternalLink) window.open(item.href, "_blank");
                      else navigate(item.href);
                    }}
                    tooltip={item.text}
                  >
                    {item.icon && item.icon}
                    <span>{item.text}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ),
            )}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarMenu>
            {MenuLinks.filter((item) => item.section === "support").map(
              (item) => (
                <SidebarMenuItem
                  key={item.text}
                  className={item.mobileOnly ? "md:hidden" : ""}
                >
                  <SidebarMenuButton
                    onClick={() => {
                      if (item.isExternalLink) window.open(item.href, "_blank");
                      else navigate(item.href);
                    }}
                    tooltip={item.text}
                  >
                    {item.icon && item.icon}
                    <span>{item.text}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ),
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="overflow-hidden">
          <div className="w-[calc(var(--sidebar-width)-1rem)] p-1 group-data-[collapsible=icon]:hidden">
            <InstallPWA />
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
