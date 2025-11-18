interface Review {
  name: string;
  date: string;
  rating: number;
  text: string;
  location?: string;
}

interface ReviewsProps {
  reviews?: Review[];
  googleReviewUrl?: string;
  googleRating?: number | string;
  googleReviewCount?: number | string;
}

export default function Reviews({ reviews = [], googleReviewUrl, googleRating, googleReviewCount }: ReviewsProps) {
  // Debug logging for incoming props
  console.log("✅ Incoming Props:", {
    googleRating,
    googleReviewCount,
    reviews
  });

  // Don't render anything if no reviews exist
  if (!reviews || reviews.length === 0) {
    return null;
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex text-yellow-400 gap-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 fill-current ${
              index < rating ? 'text-yellow-400' : 'text-gray-600'
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Safely coerce strings/numbers to numbers
  const displayRating = typeof googleRating === "string"
    ? parseFloat(googleRating)
    : googleRating;

  const displayCount = typeof googleReviewCount === "string"
    ? parseInt(googleReviewCount, 10)
    : googleReviewCount;

  // Conditionally render summary only if both are valid numbers
  const showSummary =
    typeof displayRating === "number" &&
    typeof displayCount === "number" &&
    !isNaN(displayRating) &&
    !isNaN(displayCount);

  if (!showSummary) {
    console.log("⛔ Skipping summary — invalid values", { displayRating, displayCount });
  }

  return (
    <section className="py-16 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            What Our <span className="text-yellow-400">Customers</span> Say
          </h2>
          {showSummary && (
            <p className="text-gray-400 text-center text-lg">
              Rated {displayRating}★ on Google by {displayCount}+ happy customers.
            </p>
          )}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-yellow-500/30 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <div className="mb-6">
                {/* Rating Stars */}
                <div className="mb-4">
                  {renderStars(review.rating)}
                </div>

                {/* Review Text */}
                <p className="text-gray-300 italic text-lg leading-relaxed mb-4">
                  "{review.text}"
                </p>

                {/* Reviewer Info */}
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-yellow-400 font-semibold text-sm">
                      {review.name?.charAt(0).toUpperCase() || '?'}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{review.name || 'Anonymous'}</p>
                    <p className="text-gray-400 text-sm">
                      {review.date || 'Verified Customer'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Enhanced CTA button */}
        {googleReviewUrl && (
          <div className="mt-12 text-center">
            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition"
            >
              Read More Reviews on Google →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
