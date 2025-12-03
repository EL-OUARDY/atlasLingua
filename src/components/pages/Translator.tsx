import { ElementType, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROUTES } from "@/routes/routes";
import { FileText, Languages, HistoryIcon, LucideIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useHistory } from "@/contexts/HistoryContext";
import TranslationHistory from "@/components/translator/TranslationHistory";
import TransliterationIcon from "@/components/ui/icons/TransliterationIcon";
import KoFiIcon from "@/components/ui/icons/KoFiIcon";
import { APP_BMC } from "@/shared/constants";
import { cn } from "@/lib/utils";
import WTooltip from "@/components/ui/custom/WTooltip";

type Tab = "Text" | "Summarization" | "Transliteration";

const translationTypes: {
  type: Tab;
  link: string;
  description: string;
  icon: LucideIcon | ElementType;
}[] = [
  {
    type: "Text",
    link: ROUTES.translate.index,
    description: "AI-powered",
    icon: Languages,
  },
  {
    type: "Summarization",
    link: ROUTES.translate.summarization,
    description: "Smart recap",
    icon: FileText,
  },
  {
    type: "Transliteration",
    link: ROUTES.translate.transliteration,
    description: "Arabic → Latin",
    icon: TransliterationIcon,
  },
];

function Translator() {
  const location = useLocation();
  const currentPath =
    location.pathname === ROUTES.home
      ? ROUTES.translate.index
      : location.pathname;

  const { setIsHistoryOpen } = useHistory();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(currentPath);

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto bg-muted/40 p-4 shadow-sm sm:p-6 md:rounded-lg md:border">
      <div className="flex items-center gap-4">
        <Tabs className="flex flex-1 flex-col gap-4" value={activeTab}>
          <div className="flex items-center">
            <TabsList className="mr-auto h-fit">
              {translationTypes.map((item, index) => (
                <TabsTrigger
                  key={index}
                  value={item.link}
                  onClick={() => {
                    navigate(item.link), setActiveTab(item.link);
                  }}
                  className="rounded-lg px-4 text-zinc-600 dark:text-zinc-200"
                >
                  <span className="flex items-center gap-3">
                    <item.icon className="size-5 xl:size-5" />
                    <span className="hidden flex-col text-left lg:flex">
                      <span className="text-foreground">{item.type}</span>
                      <span className="text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                  </span>
                  <span className="sr-only">{item.type}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex gap-2">
              <div className="support-us">
                <WTooltip side="left" content="Buy us a coffee">
                  <a
                    href={APP_BMC}
                    target="_blank"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "border bg-background dark:bg-secondary dark:hover:bg-background md:hidden landscape:flex",
                    )}
                  >
                    <KoFiIcon className="size-5" />
                    <span className="sr-only">Support us</span>
                  </a>
                </WTooltip>
              </div>

              {currentPath === ROUTES.translate.index && (
                <Button
                  onClick={() => setIsHistoryOpen(true)}
                  variant="outline"
                  size="icon"
                  className="dark:bg-secondary dark:hover:bg-background md:hidden landscape:flex lg:landscape:hidden"
                >
                  <HistoryIcon className="size-5" />
                  <span className="sr-only">History</span>
                </Button>
              )}
            </div>
          </div>
        </Tabs>
      </div>
      <div className="flex w-full flex-1">
        <Outlet />
      </div>
      <TranslationHistory />
    </div>
  );
}

export default Translator;
