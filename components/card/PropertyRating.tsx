import { Star } from "lucide-react";
import React from "react";

const PropertyRating = ({
	//propertyId,
	inPage
}: {
	//propertyId: string;
	inPage: boolean;
}) => {
	const rating = 4.7;
	const count = 100;

	const className = `flex gap-1 items-center ${inPage ? "text-md" : "text-sm"}`;

	const countText = count > 1 ? "reviews" : "review";
	const countValue = `(${count}) ${inPage ? countText : ""}`;
	return (
		<span className={className}>
			<Star
				fill="primary-foreground"
				strokeWidth={0}
				className="text-yellow-500"
				size={16}
			/>
			{rating} {countValue}
		</span>
	);
};

export default PropertyRating;
