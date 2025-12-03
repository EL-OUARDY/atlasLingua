import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import PostCard from "./PostCard";
import PostCardSkeleton from "../skeletons/PostCardSkeleton";
import { useCommunity } from "@/contexts/CommunityContext";
import ConfirmationDialog from "../ConfirmationDialog";
import { useSearchParams } from "react-router-dom";
import CommunityFrontPage from "./CommunityFrontPage";

interface Props {
  onPostSelected: (id: string) => void;
  selectedPostId: string | null;
  onEdit: (postId: string) => void;
}
function PostsList({ onPostSelected, selectedPostId, onEdit }: Props) {
  const { posts, fetchPosts, loadingPosts, hasMorePosts, deletePost } =
    useCommunity();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSelectedPost(selectedPostId);
  }, [selectedPostId]);

  return (
    <div className="h-full flex-1">
      {/* No posts */}
      {posts.length === 0 && !loadingPosts && <CommunityFrontPage />}

      <div className="grid gap-4 pt-0 sm:grid-cols-auto-fill-270">
        {posts.map((post, index) => (
          <PostCard
            key={index}
            post={post}
            selectedPost={selectedPost}
            onSelect={(id) => {
              setSelectedPost(id);
              onPostSelected(id);
            }}
            onDelete={(postId) => setPostToDelete(postId)}
            onEdit={onEdit}
          />
        ))}
        {loadingPosts &&
          Array(8)
            .fill(null)
            .map((_, index) => <PostCardSkeleton key={index} />)}
      </div>

      {/* "Load More" button (hidden if no more data or currently loading) */}
      {hasMorePosts && !loadingPosts && (
        <div className="my-4 w-full text-center">
          <Button
            onClick={fetchPosts}
            variant="outline"
            className="max-w-fit text-xs"
          >
            Load More
          </Button>
        </div>
      )}

      <ConfirmationDialog
        title="Are you absolutely sure?"
        description="This action cannot be undone! This will permanently delete your post."
        onOK={() => {
          deletePost(postToDelete as string);
          setPostToDelete(null);
          setSearchParams((prev) => {
            prev.set("deleted", "true");
            prev.delete("post_id");
            prev.delete("edit_post");
            return prev;
          });
        }}
        onAbort={() => setPostToDelete(null)}
        isOpen={!!postToDelete}
      />
      {posts.length > 0 && (
        <div className="invisible hidden h-14 md:flex"></div>
      )}
    </div>
  );
}

export default PostsList;
