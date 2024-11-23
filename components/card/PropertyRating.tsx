import { fetchPropertyRating } from "@/utils/actions";
import React from "react";
import { FaStar } from "react-icons/fa";

const PropertyRating = async ({
	propertyId,
	inPage
}: {
	propertyId: string;
	inPage: boolean;
}) => {
	const { rating, count } = await fetchPropertyRating(propertyId);
	if (count < 1) return null;

	const className = `flex gap-1 items-center ${inPage ? "text-md" : "text-sm"}`;
	const countText = count > 1 ? "reviews" : "review";
	const countValue = `(${count}) ${inPage ? countText : ""}`;
	return (
		<span className={className}>
			<FaStar fill="orange" strokeWidth={0} className="w-4 h-4" size={16} />
			{rating} {countValue}
		</span>
	);
};

export default PropertyRating;
