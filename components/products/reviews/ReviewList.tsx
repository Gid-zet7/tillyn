import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { getSellerReviews } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Review {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    first_name: string;
    last_name: string;
    picture: string;
  };
}

interface ReviewListProps {
  sellerId: string;
  refreshTrigger: number;
}

export default function ReviewList({
  sellerId,
  refreshTrigger,
}: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const INITIAL_REVIEWS_COUNT = 2;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getSellerReviews(sellerId);
        console.log(data);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [sellerId, refreshTrigger]);

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  if (reviews?.length === 0) {
    return <div className="text-gray-500">No reviews yet</div>;
  }

  const displayedReviews = showAllReviews
    ? reviews
    : reviews?.slice(0, INITIAL_REVIEWS_COUNT);

  const hasMoreReviews = reviews?.length > INITIAL_REVIEWS_COUNT;

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {displayedReviews?.map((review) => (
          <div key={review._id} className="border-b pb-4">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="w-8 h-8">
                {/* <AvatarImage src={review.user.picture} alt="reviewer" /> */}
                <AvatarFallback>
                  {review.user.first_name[0]}
                  {review.user.last_name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">
                  {review.user.first_name} {review.user.last_name}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${
                        index < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
            <div className="text-sm text-gray-400 mt-1">
              {new Date(review.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {hasMoreReviews && (
        <Button
          variant="outline"
          className="w-full mt-4 flex items-center gap-2 justify-center"
          onClick={() => setShowAllReviews(!showAllReviews)}
        >
          {showAllReviews ? (
            <>
              Show Less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Show All Reviews ({reviews.length}){" "}
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </Button>
      )}
    </div>
  );
}
