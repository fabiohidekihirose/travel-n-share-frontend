import PostCard from "./PostCard";
import { PostProps } from "./PostCard";
import { FavProps } from "./MyPosts";

interface UserPostsProps {
  userPosts: PostProps[];
  user_id: string | null;
}

export default function UserPosts({ userPosts, user_id }: UserPostsProps) {
  return (
    <>
      {userPosts.length ? (
        userPosts.map((post: PostProps) => (
          <PostCard
            key={post.id}
            post={post}
            isFavorite={
              !!post.favorite.filter(
                (favorite: FavProps) => favorite.user_id === user_id
              ).length
            }
          />
        ))
      ) : (
        <div className="bg-[#DBE2EF] rounded-[10px] text-center p-4 text-[20px] shadow-[0_0_10px_rgb(219,226,239)]">
          No posts yet
        </div>
      )}
    </>
  );
}
