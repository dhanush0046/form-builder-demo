// import { useState } from 'react';
// import { Star } from 'lucide-react'; // assuming you use lucide-react for icons

// export const RatingInput = () => {
//   const [rating, setRating] = useState(0);

//   const handleRatingChange = (newRating: number) => {
//     setRating(newRating);
//   };

//   return (
//     <div className="flex items-center space-x-2">
//       {Array(5)
//         .fill(0)
//         .map((_, index) => (
//           <Star
//             key={index}
//             className={`cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
//             onClick={() => handleRatingChange(index + 1)}
//             size={24}
//           />
//         ))}
//       <p className="ml-2 text-gray-700">{rating} / 5</p>
//     </div>
//   );
// };

import { useState } from 'react';
import { Star } from 'lucide-react';

export const RatingInput = () => {
  const [rating, setRating] = useState(0); // Stores the selected rating
  const [hover, setHover] = useState(0);   // Stores the hovered rating

  const handleRatingChange = (newRating: number) => {
    setRating(newRating); // Set the rating when a star is clicked
  };

  return (
    <div className="flex items-center space-x-2 background-red-500">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <Star
            key={index}
            className={`cursor-pointer transition-colors duration-200 ${
              (hover || rating) > index ? 'text-yellow-500' : 'text-gray-300'
            }`}
            onClick={() => handleRatingChange(index + 1)}      // Handle star click
            onMouseEnter={() => setHover(index + 1)}           // Handle mouse hover
            onMouseLeave={() => setHover(0)}                   // Reset hover on mouse leave
            size={24}
          />
        ))}
      <p className="ml-2 text-gray-700">{rating} / 5</p>
    </div>
  );
};
