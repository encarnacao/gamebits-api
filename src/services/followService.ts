import errors from "@/errors";
import followRepository from "@/repositories/followRepository";

async function checkFollow(user_id: number, followed_id: number) {
  if (user_id === followed_id) {
    throw errors.badRequestError("You can't follow yourself");
  }
  const follow = await followRepository.searchFollow(user_id, followed_id);
  return follow;
}

async function followUser(user_id: number, followed_id: number) {
  const follow = await checkFollow(user_id, followed_id);
  if (follow) {
    throw errors.conflictError();
  }
  return await followRepository.followUser(user_id, followed_id);
}

async function unfollowUser(user_id: number, followed_id: number) {
  const follow = await checkFollow(user_id, followed_id);
  if (!follow) {
    throw errors.notFoundError();
  }
  await followRepository.unfollowUser(follow.id);
  return { message: "Unfollowed successfully" };
}

async function getFollowers(user_id: number) {
  const search = await followRepository.getFollowers(user_id);
  if (search.length === 0) {
    throw errors.notFoundError();
  }
  const followers = search.map((follow) => ({
    id: follow.users_follows_followingTousers.id,
    username: follow.users_follows_followingTousers.username,
    image_url: follow.users_follows_followingTousers.image_url,
  }));
  return followers;
}

async function getFollowings(user_id: number) {
  const search = await followRepository.getFollowings(user_id);
  if (search.length === 0) {
    throw errors.notFoundError();
  }
  const following = search.map((follow) => ({
    id: follow.users_follows_followedTousers.id,
    username: follow.users_follows_followedTousers.username,
    image_url: follow.users_follows_followedTousers.image_url,
  }));
  return following;
}

const followService = { followUser, unfollowUser, getFollowers, getFollowings };

export default followService;
