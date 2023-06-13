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
  const followers = await followRepository.getFollowers(user_id);
  if (followers.length === 0) {
    throw errors.notFoundError();
  }
  return followers;
}

async function getFollowings(user_id: number) {
  const followings = await followRepository.getFollowings(user_id);
  if (followings.length === 0) {
    throw errors.notFoundError();
  }
  return followings;
}

const followService = { followUser, unfollowUser, getFollowers, getFollowings };

export default followService;
