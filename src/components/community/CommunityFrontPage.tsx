import { ROUTES } from "@/routes/routes";
import { PenLine, BookOpenIcon, RulerIcon, UsersRoundIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

interface Props {
  isPage?: boolean;
  className?: string;
}
function CommunityFrontPage({ isPage = false, className }: Props) {
  return (
    <div
      className={cn(
        "community-welcome flex h-full border bg-muted/40 px-4 py-8 md:rounded-lg",
        isPage && "mb-4 max-w-3xl",
        className,
      )}
    >
      <div className="flex flex-col gap-4 rounded-lg">
        <div className="">
          <div className="w-full p-4 sm:p-0">
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome to our Forum
            </h2>
            <p className="mt-1 text-muted-foreground">
              Join our supportive community of language learners! Share your
              questions, experiences, and help others along the way.
            </p>
          </div>
          <Separator className="mb-2 mt-6 hidden sm:block" />
        </div>

        <div className="grid-cols-auto-fill-350 grid gap-4">
          <Link
            to={ROUTES.community + "?new_post=true"}
            className="flex items-start overflow-hidden rounded-lg bg-background p-4"
          >
            <PenLine className="mr-3 h-6 w-6 flex-shrink-0 text-sky-500" />
            <div className="text-left">
              <h3 className="mb-2 font-semibold text-primary">Ask Questions</h3>
              <p className="text-sm text-muted-foreground">
                Stuck on a difficult phrase? Need help with vocabulary or
                pronunciation? Our supportive community is ready to assist you
                with any language challenge.
              </p>
            </div>
          </Link>

          <div className="flex items-start overflow-hidden rounded-lg bg-background p-4">
            <UsersRoundIcon className="mr-3 h-6 w-6 flex-shrink-0 text-sky-500" />
            <div className="text-left">
              <h3 className="mb-2 font-semibold text-primary">
                Practice with Others
              </h3>
              <p className="text-sm text-muted-foreground">
                Looking for someone to practice language with? Connect with
                other learners and start improving together.
              </p>
            </div>
          </div>

          <div className="flex items-start overflow-hidden rounded-lg bg-background p-4">
            <BookOpenIcon className="mr-3 h-6 w-6 flex-shrink-0 text-sky-500" />
            <div className="text-left">
              <h3 className="mb-2 font-semibold text-primary">
                Share Knowledge
              </h3>
              <p className="text-sm text-muted-foreground">
                Discuss learning techniques, share resources, or help others
                understand tricky concepts.
              </p>
            </div>
          </div>

          <div className="flex items-start overflow-hidden rounded-lg bg-background p-4">
            <RulerIcon className="mr-3 h-6 w-6 flex-shrink-0 text-sky-500" />
            <div className="text-left">
              <h3 className="mb-2 font-semibold text-primary">
                Forum Guidelines
              </h3>
              <p className="text-sm text-muted-foreground">
                We encourage respectful and supportive interactions. Keep
                discussions on topic and use appropriate language. Remember,
                we're all here to help each other learn and grow in our language
                journey.
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full overflow-hidden">
          <Link
            to={ROUTES.community + "?new_post=true"}
            className={cn(
              "max-w-fit rounded-md bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-700",
              !isPage && "mx-auto md:mx-0 xl:hidden",
            )}
          >
            Create New Post
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CommunityFrontPage;
