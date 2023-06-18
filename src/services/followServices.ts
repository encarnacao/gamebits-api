import errors from "@/errors";
import followRepository from "@/repositories/followRepository";
import userRepository from "@/repositories/userRepository";

async function checkFollow(userId: number, followedId: number) {
  if (userId === followedId) {
    throw errors.badRequestError("You can't follow yourself");
  }
  const follow = await followRepository.searchFollow(userId, followedId);
  return follow;
}

async function followUser(userId: number, followedId: number) {
  const user = await userRepository.findUserById(followedId);
  if (!user) {
    throw errors.notFoundError();
  }
  const follow = await checkFollow(userId, followedId);
  if (follow) {
    throw errors.conflictError();
  }
  return await followRepository.followUser(userId, followedId);
}

async function unfollowUser(userId: number, followedId: number) {
  const follow = await checkFollow(userId, followedId);
  if (!follow) {
    throw errors.notFoundError();
  }
  await followRepository.unfollowUser(follow.id);
  return { message: "Unfollowed successfully" };
}

async function getFollowers(userId: number) {
  const search = await followRepository.getFollowers(userId);
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

async function getFollowings(userId: number) {
  const search = await followRepository.getFollowings(userId);
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
