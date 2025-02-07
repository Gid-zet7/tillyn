import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createReview } from "@/lib/actions";

interface ReviewFormProps {
  sellerId: string;
  userEmail: string | null;
  onReviewSubmitted: () => void;
}

export default function ReviewForm({
  sellerId,
  userEmail,
  onReviewSubmitted,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        variant: "destructive",
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        title: "Please write a comment",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // const response = await fetch("/api/sellers/reviews/new", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     sellerId,
      //     userEmail,
      //     rating,
      //     comment,
      //   }),
      // });

      await createReview(sellerId, userEmail, rating, comment);

      // if (!response.ok) {
      //   throw new Error("Failed to submit review");
      // }

      toast({
        title: "Review submitted successfully",
      });
      setRating(0);
      setComment("");
      onReviewSubmitted();
    } catch (error) {
      toast({
        title: "Failed to submit review",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                value <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
      <Textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="min-h-[100px]"
      />
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
