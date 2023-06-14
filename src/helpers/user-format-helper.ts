import { UnformattedUser } from "@/protocols";

export function formatUser(user: UnformattedUser){
  const follower_count = user.follows_follows_followedTousers.length;
  const following_count = user.follows_follows_followingTousers.length;
  const formattedUser = {
    id: user.id,
    username: user.username,
    imageUrl: user.image_url,
    followers: follower_count,
    following: following_count,
  };
  return formattedUser;
}