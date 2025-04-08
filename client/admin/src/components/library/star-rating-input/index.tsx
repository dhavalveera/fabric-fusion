import { forwardRef, useState } from "react";

// heroicons
import { StarIcon } from "@heroicons/react/24/solid";

// utils
import { cn } from "@/utils/cn";

// types
import { StarRatingProps } from "@/types";

{
  /* <StarRating value={value} onChange={setValue} />; */
}

const StarRating = forwardRef<HTMLDivElement, StarRatingProps>((props, ref) => {
  const { className = "", maxStars = 5, onChange, value, ...rest } = props;

  const [hovered, setHovered] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(value);

  const handleClick = (index: number) => {
    setRating(index);
    onChange?.(index);
  };

  return (
    <div className={cn("flex gap-1", className)} ref={ref} {...rest}>
      {[...Array(maxStars)].map((_, index) => {
        const starIndex = index + 1;

        return (
          <StarIcon
            key={index}
            className={cn("size-6 cursor-pointer transition-all", starIndex <= (hovered ?? rating) ? "fill-yellow-400 stroke-yellow-400" : "fill-gray-300 stroke-gray-300")}
            onMouseEnter={() => setHovered(starIndex)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(starIndex)}
          />
        );
      })}
    </div>
  );
});

export default StarRating;
