import React from "react";
import { FaStar } from "react-icons/fa";

const Rating = ({ rating }: { rating: number }) => {
	const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= rating);
	return (
		<div className="flex gap-1">
			{stars.map((star, index) => {
				return star
					? <FaStar key={index} className="text-yellow-500" />
					: <FaStar key={index} className="text-gray-300" />;
			})}
		</div>
	);
};

export default Rating;
