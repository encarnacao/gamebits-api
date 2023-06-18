import { UnformattedReviews, UnformattedUserReviews } from "@/protocols";

function separateVotes(votes: { up_vote: boolean; user_id: number }[]) {
  const upVotes: number[] = [];
  const downVotes: number[] = [];
  votes.forEach((vote) => {
    if (vote.up_vote) {
      upVotes.push();
    } else {
      downVotes.push(vote.user_id);
    }
  });
  return { upVotes, downVotes };
}

export function formatReviews(reviews: UnformattedReviews[]) {
  const formattedReviews = reviews.map((review) => {
    const { upVotes, downVotes } = separateVotes(review.votes);
    const newReview = {
      id: review.id,
      text: review.text,
      rating: Number(review.rating),
      reviewWriter: {
        id: review.users.id,
        username: review.users.username,
        imageUrl: review.users.image_url,
      },
      upVotes: upVotes,
      downVotes: downVotes,
      createdAt: review.created_at,
    };
    return newReview;
  });
  return formattedReviews;
}

export function formatUserReviews(reviews: UnformattedUserReviews[]) {
  const formattedReviews = reviews.map((review) => {
    const { upVotes, downVotes } = separateVotes(review.votes);
    const newReview = {
      id: review.id,
      text: review.text,
      rating: Number(review.rating),
      game: {
        id: review.games.id,
        name: review.games.name,
        coverUrl: review.games.cover_url,
        originalReleaseDate: review.games.original_release_date,
        genres: review.games.genres,
        platforms: review.games.platforms,
      },
      upVotes: upVotes,
      downVotes: downVotes,
      createdAt: review.created_at,
    };
    return newReview;
  });
  return formattedReviews;
}
