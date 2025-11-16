import { getSafeGarage } from "@/lib/fallbackGarage";

type Props = {
  garage?: any;
  googleReviewCount?: number | string;
  googleReviewLink?: string;
  averageRating?: string;
};

// 🛠️ Reviews component with premium styling and shared fallback logic
// ✅ Uses shared fallbackGarage for consistent defaults
// ✅ 100% safe rendering with null/undefined garage props
// ✅ Premium dark theme with gold accents
// ✅ Ready for 1000+ dynamic garage microsites

export default function Reviews({ 
  garage, 
  googleReviewCount, 
  googleReviewLink,
  averageRating 
}: Props) {
  const safeGarage = getSafeGarage(garage);
  const rawReviews = safeGarage.reviews || [];
  
  // Normalize reviews to handle both formats: {quote, author} and {text, name, date, rating}
  const reviews = rawReviews.map((review: any) => {
    // Handle format: {quote, author}
    if (review.quote && review.author) {
      return {
        text: review.quote,
        author: review.author,
        name: review.author,
        date: review.date,
        rating: review.rating || 5
      };
    }
    // Handle format: {text, name, date, rating}
    if (review.text && review.name) {
      return {
        text: review.text,
        author: review.name,
        name: review.name,
        date: review.date,
        rating: review.rating || 5
      };
    }
    // Fallback for any other format
    return {
      text: review.text || review.quote || '',
      author: review.name || review.author || 'Customer',
      name: review.name || review.author || 'Customer',
      date: review.date,
      rating: review.rating || 5
    };
  }).filter((r: any) => r.text && r.text.trim().length > 0);
  
  // Use provided average rating or calculate from reviews
  const reviewsWithRatings = reviews.filter((r: any) => typeof r.rating === 'number');
  const calculatedRating = reviewsWithRatings.length > 0
    ? (reviewsWithRatings.reduce((sum: number, r: any) => sum + r.rating, 0) / reviewsWithRatings.length).toFixed(1)
    : undefined;
  
  const rating = averageRating || calculatedRating;
  const reviewCount = googleReviewCount || (reviews.length > 0 ? reviews.length : undefined);
  const reviewLink = googleReviewLink;

  return (
    <div className="py-16 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full mb-4">
            <span className="text-yellow-400 text-sm font-medium tracking-wide">CUSTOMER REVIEWS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            What Our <span className="text-yellow-400">Customers</span> Say
          </h2>
          {rating && reviewCount && (
            <p className="max-w-2xl mx-auto text-center text-sm md:text-base text-gray-400">
              Rated <strong className="text-yellow-400">{rating} ★</strong> on Google by {reviewCount}+ happy customers. Here's what real customers say about {safeGarage.name}.
            </p>
          )}
          {(!rating || !reviewCount) && reviews.length > 0 && (
            <p className="max-w-2xl mx-auto text-center text-sm md:text-base text-gray-400">
              Here's what real customers say about {safeGarage.name}.
            </p>
          )}
        </div>
        
        {reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
            <div key={index} className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8 hover:border-yellow-500/30 hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="mb-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 italic text-lg leading-relaxed mb-4">
                  "{review.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
                    {review.author && typeof review.author === 'string' ? (
                      <span className="text-yellow-400 font-semibold text-sm">
                        {review.author.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      <span className="text-yellow-400 font-semibold text-sm">?</span>
                    )}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{review.author || review.name || 'Anonymous'}</p>
                    <p className="text-gray-400 text-sm">
                      {review.date ? new Date(review.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : 'Verified Customer'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
        
        {reviewLink && reviewCount && (
          <div className="text-center mt-12">
            <a
              href={reviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 text-sm font-semibold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-400 hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black"
            >
              Read all {reviewCount} Google reviews →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}