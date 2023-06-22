import { UnformattedUser } from "@/protocols";

export function formatUser(user: UnformattedUser, id?: number) {
  const follower_count = user.follows_follows_followedTousers.length;
  const following_count = user.follows_follows_followingTousers.length;
  const followedByUser = id
    ? user.follows_follows_followedTousers.some(
        (follow) => follow.following === id
      )
    : false;
  const formattedUser = {
    id: user.id,
    username: user.username,
    imageUrl: user.image_url,
    followers: follower_count,
    following: following_count,
    followedByUser: followedByUser,
  };
  return formattedUser;
}
